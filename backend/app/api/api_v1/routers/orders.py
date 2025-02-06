from typing import List

from fastapi import APIRouter, Depends, status, HTTPException
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from sqlalchemy.orm.exc import NoResultFound

from app.db.models import Booking, User, Flight
from app.db.schemas import BookingListSchema
from app.db.session import get_db


order_router = APIRouter(prefix="/orders", tags=["orders"])


@order_router.get("/{user_id}/", response_model=dict)
def get_orders(user_id: int, db: Session = Depends(get_db),
               page: int = 1, per_page: int = 10):
    offset = (page - 1) * per_page

    # Check if user exists
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )

    # Query the database for bookings
    query = db.query(Booking).filter(Booking.user_id == user_id)
    total = query.count()
    bookings = query.offset(offset).limit(per_page).all()

    # If no bookings found
    if not bookings:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No bookings found for this user.")

    # Serialize the results
    bookings_data = [BookingListSchema.from_orm(booking).dict() for booking in bookings]

    return {"total": total, "data": bookings_data}

@order_router.get("/{user_id}/order_detail/{order_id}/", response_model=dict)
def get_order_detail(user_id: int, order_id: int, db: Session = Depends(get_db)):
    # Check if the user exists
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )

    # Retrieve the booking with the associated flight and return flight
    booking = db.query(Booking).filter(Booking.id == order_id, Booking.user_id == user_id).first()
    if not booking:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Order not found",
        )

    # Serialize flight details
    def serialize_flight(flight: Flight):
        return {
            "id": flight.id,
            "airline_id": flight.airline_id,
            "flight_number": flight.flight_number,
            "departure_city": flight.departure_city,
            "arrival_city": flight.arrival_city,
            "departure_time": flight.departure_time.isoformat(),
            "arrival_time": flight.arrival_time.isoformat(),
            "class_type": flight.class_type
        } if flight else None

    response_data = {
        "id": booking.id,
        "booking_date": booking.booking_date.isoformat(),
        "flight": serialize_flight(booking.flight),
        "return_flight": serialize_flight(booking.return_flight),
        "total_price": str(booking.total_price),
        "status": booking.status
    }

    return response_data





