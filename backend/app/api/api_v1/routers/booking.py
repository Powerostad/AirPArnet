import json
from datetime import date, datetime
from decimal import Decimal

from dateutil.relativedelta import relativedelta
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.db.models import User, Flight, Booking
from app.db.schemas import CreateBookingRequest
from app.db.session import get_db

booking_router = APIRouter(prefix="/booking", tags=["booking"])

@booking_router.post("/{user_id}/", response_model=dict)
def create_booking(user_id: int, booking_request: CreateBookingRequest, db: Session = Depends(get_db)):
    # Verify that the user exists
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

    # Get the primary flight details
    flight = db.query(Flight).filter(Flight.id == booking_request.flight_id).first()
    if not flight:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Flight not found")

    # Optionally, if return flight provided, get its details
    return_flight = None
    if booking_request.return_flight_id:
        return_flight = db.query(Flight).filter(Flight.id == booking_request.return_flight_id).first()
        if not return_flight:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Return flight not found")

    # Use flight's departure date for age calculation.
    flight_date: date = flight.departure_time.date()
    total_price = Decimal(0)
    passengers_output = []

    # Loop through each passenger and classify by age

    total_price += len(booking_request.passengers)  * flight.price_per_adult

    if booking_request.refund:
        total_price += Decimal(len(booking_request.passengers)) * 420000
    # Create the Booking record
    booking = Booking(
        flight_id=flight.id,
        return_flight_id=return_flight.id if return_flight else None,
        user_id=user.id,
        booking_date=datetime.now(),
        passengers=json.dumps(passengers_output),
        total_price=Decimal(total_price),
        status="PENDING"
    )

    db.add(booking)
    db.commit()
    db.refresh(booking)

    return {
        "booking_id": booking.id,
        "flight_id": booking.flight_id,
        "return_flight_id": booking.return_flight_id,
        "booking_date": booking.booking_date.isoformat(),
        "passengers": passengers_output,
        "total_price": str(booking.total_price),
        "status": booking.status
    }


@booking_router.post("/{user_id}/{booking_id}/", response_model=dict)
def pay(user_id: int, booking_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

    booking = db.query(Booking).filter(Booking.id == booking_id).first()
    if not booking:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Booking not found")

    booking.status = "CONFIRMED"
    db.commit()
    return {"success": True}


