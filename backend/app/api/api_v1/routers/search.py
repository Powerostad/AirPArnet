from typing import Optional
from fastapi.responses import JSONResponse
from fastapi import APIRouter, Depends, HTTPException, status
from pydantic.validators import datetime
from sqlalchemy import and_
from sqlalchemy.orm import aliased, Session, joinedload

from app.db.models import Airline, Flight
from app.db.session import get_db


search_router = APIRouter(prefix="/search", tags=["search"])

def serialize_flight(flight):
    """Serialize a flight object including airline information."""
    flight_data = {
        "id": flight.id,
        "flight_number": flight.flight_number,
        "departure_city": flight.departure_city,
        "arrival_city": flight.arrival_city,
        "departure_time": flight.departure_time,
        "arrival_time": flight.arrival_time,
        "price_per_adult": flight.price_per_adult,
        "price_per_child": flight.price_per_child,
        "price_per_baby": flight.price_per_baby,
        "available_seats": flight.available_seats,
        "is_international": flight.is_international,
        "load_capacity": flight.load_capacity,
        "class_type": flight.class_type,
        "airline": {
            "id": flight.airline.id,
            "name": flight.airline.name
        }
    }
    return flight_data

@search_router.get("/airlines/")
async def get_airlines(db = Depends(get_db)):
    airline_names = [name for (name,) in db.query(Airline.name).distinct().all()]
    return JSONResponse({"airlines": airline_names})


@search_router.get("/")
async def search_view(
    db: Session = Depends(get_db),
    two_sided: bool = False,
    flight_type: str = "internal",
    departure_city: Optional[str] = None,
    arrival_city: Optional[str] = None,
    departure_time: Optional[datetime] = None,
    arrival_time: Optional[datetime] = None,
    adult_passengers: int = 1,
    child_passengers: int = 0,
    baby_passengers: int = 0,
    airline: Optional[str] = None,
    page: int = 1,           # Pagination: current page (default is page 1)
    per_page: int = 10       # Results per page (default is 10)
):
    total_passengers = adult_passengers + child_passengers + baby_passengers
    offset = (page - 1) * per_page  # Calculate the offset

    # -------------------------------------------------
    # ONE-WAY SEARCH
    # -------------------------------------------------
    if not two_sided:
        query = db.query(Flight).options(joinedload(Flight.airline)).join(Airline)

        # Flight type filter for departure flight.
        if flight_type.lower() == "internal":
            query = query.filter(Flight.is_international.is_(False))
        elif flight_type.lower() in ["external", "international"]:
            query = query.filter(Flight.is_international.is_(True))

        if departure_city:
            query = query.filter(Flight.departure_city == departure_city)
        if arrival_city:
            query = query.filter(Flight.arrival_city == arrival_city)
        if departure_time:
            query = query.filter(Flight.departure_time >= departure_time)
        if arrival_time:
            query = query.filter(Flight.arrival_time <= arrival_time)
        if airline:
            query = query.filter(Airline.name == airline)

        # Only return flights with enough available seats.
        query = query.filter(Flight.available_seats >= total_passengers)
        total_items = query.count()
        # Apply pagination
        departure_flights = query.offset(offset).limit(per_page).all()

        # Wrap each flight in a "segments" list to match the two-sided structure.
        results = [{"segments": [serialize_flight(flight)]} for flight in departure_flights]
        return {"total_items": total_items, "flights": results}

    # -------------------------------------------------
    # TWO-SIDED (ROUND-TRIP) SEARCH
    # -------------------------------------------------
    # Both cities are required for round-trip search.
    if not departure_city or not arrival_city:
        raise HTTPException(
            status_code=400,
            detail="Both departure_city and arrival_city must be provided for a round-trip search."
        )

    # Create an alias for the return flight.
    ReturnFlight = aliased(Flight)

    # Build the query joining departure flight with its return flight.
    query = (
        db.query(Flight, ReturnFlight)
        .select_from(Flight)
        .options(
            joinedload(Flight.airline),
            joinedload(ReturnFlight.airline)
        )
    )

    # --- Departure Flight Filters ---
    query = query.filter(
        Flight.departure_city == departure_city,
        Flight.arrival_city == arrival_city,
        Flight.available_seats >= total_passengers,
    )
    if departure_time:
        query = query.filter(Flight.departure_time >= departure_time)
    if arrival_time:
        query = query.filter(Flight.arrival_time <= arrival_time)
    if flight_type.lower() == "internal":
        query = query.filter(Flight.is_international.is_(False))
    elif flight_type.lower() in ["external", "international"]:
        query = query.filter(Flight.is_international.is_(True))
    if airline:
        query = query.filter(Airline.name == airline)

    # --- Return Flight Filters ---
    # Join the return flight using reversed city conditions.
    query = query.join(
        ReturnFlight,
        and_(
            # Return flight departs from the arrival city of the departure flight.
            ReturnFlight.departure_city == Flight.arrival_city,
            # Return flight arrives at the departure city of the departure flight.
            ReturnFlight.arrival_city == Flight.departure_city,
            # Ensure enough seats on the return flight.
            ReturnFlight.available_seats >= total_passengers,
            # Return flight should depart after the departure flight arrives.
            ReturnFlight.departure_time >= Flight.arrival_time,
        )
    )
    # (Optional) Additional filters for the return flight.
    if flight_type.lower() == "internal":
        query = query.filter(ReturnFlight.is_international.is_(False))
    elif flight_type.lower() in ["external", "international"]:
        query = query.filter(ReturnFlight.is_international.is_(True))
    if airline:
        # If filtering by the same airline for both legs,
        # join an alias for the airline for the return flight.
        ReturnAirline = aliased(Airline)
        query = query.join(ReturnAirline, ReturnFlight.airline).filter(ReturnAirline.name == airline)

    # Apply pagination for the round-trip results.
    total_items = query.count()
    paired_flights = query.offset(offset).limit(per_page).all()

    # Bundle each pair in a single "segments" list with serialized flight data.
    results = []
    for dep_flight, ret_flight in paired_flights:
        results.append({
            "segments": [
                serialize_flight(dep_flight),   # outbound flight
                serialize_flight(ret_flight)    # return flight
            ]
        })

    return {"total_items": total_items, "flights": results}
