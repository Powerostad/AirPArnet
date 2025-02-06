from sqlalchemy import (
    Column, Integer, String, DateTime, DECIMAL, Boolean, ForeignKey, Index, func, JSON
)
from sqlalchemy.orm import relationship

from .session import Base


class User(Base):
    __tablename__ = "user"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    full_name = Column(String(255), index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    phone_number = Column(String(20), nullable=True)
    is_superuser = Column(Boolean, default=False)
    picture = Column(String(255), nullable=False, default="default_profile.jpg")

    bookings = relationship("Booking", back_populates="user")

    __table_args__ = {"mysql_charset": "utf8mb4", "mysql_collate": "utf8mb4_unicode_ci"}


class Flight(Base):
    __tablename__ = 'flight'

    id = Column(Integer, primary_key=True, autoincrement=True)
    airline_id = Column(Integer, ForeignKey('airline.id'), nullable=False)
    flight_number = Column(String(10), nullable=False)
    departure_city = Column(String(50), nullable=False)
    arrival_city = Column(String(50), nullable=False)
    departure_time = Column(DateTime, nullable=False)
    arrival_time = Column(DateTime, nullable=False)
    price_per_adult = Column(DECIMAL(10, 2), nullable=False)
    price_per_child = Column(DECIMAL(10, 2), nullable=False)
    price_per_baby = Column(DECIMAL(10, 2), nullable=False)
    available_seats = Column(Integer, nullable=False)
    is_international = Column(Boolean, nullable=False)
    load_capacity = Column(DECIMAL(10, 2), nullable=False)
    class_type = Column(String(50), nullable=False)

    bookings = relationship("Booking", back_populates="flight")
    airline = relationship("Airline", back_populates="flights")

    __table_args__ = (
        Index("idx_flights_cities", "departure_city", "arrival_city"),
        {"mysql_charset": "utf8mb4", "mysql_collate": "utf8mb4_unicode_ci"},
    )


class Booking(Base):
    __tablename__ = 'booking'

    id = Column(Integer, primary_key=True, autoincrement=True)
    flight_id = Column(Integer, ForeignKey('flight.id'))
    return_flight_id = Column(Integer, ForeignKey('flight.id'), nullable=True)
    user_id = Column(Integer, ForeignKey('user.id'))
    booking_date = Column(DateTime, nullable=False)
    passengers = Column(JSON, nullable=False)
    total_price = Column(DECIMAL(10, 2), nullable=False)
    status = Column(String(20), default='PENDING')

    flight = relationship(
        "Flight",
        back_populates="bookings",
        foreign_keys=[flight_id]  # This relationship uses flight_id
    )
    return_flight = relationship(
        "Flight",
        foreign_keys=[return_flight_id]  # This relationship uses return_flight_id
    )
    user = relationship("User", back_populates="bookings")

    __table_args__ = (
        Index("idx_bookings_user", "user_id"),
        Index("idx_bookings_flight", "flight_id"),
        {"mysql_charset": "utf8mb4", "mysql_collate": "utf8mb4_unicode_ci"},
    )


class Airline(Base):
    __tablename__ = 'airline'

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(255), nullable=False)
    package_weight = Column(DECIMAL(10, 2), nullable=False)
    features = Column(JSON, nullable=False)

    flights = relationship("Flight", back_populates="airline")

    __table_args__ = {"mysql_charset": "utf8mb4", "mysql_collate": "utf8mb4_unicode_ci"}


class AirlineReview(Base):
    __tablename__ = 'airline_review'

    id = Column(Integer, primary_key=True, autoincrement=True)
    review_text = Column(String(500), nullable=False)
    user_id = Column(Integer, ForeignKey('user.id'))
    airline_id = Column(Integer, ForeignKey('airline.id'))

    user = relationship("User")
    airline = relationship("Airline")

    __table_args__ = {"mysql_charset": "utf8mb4", "mysql_collate": "utf8mb4_unicode_ci"}

class AccountMoney(Base):
    __tablename__ = 'account_money'

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey('user.id'))
    amount = Column(DECIMAL(12, 2), nullable=False, default=0)

    user = relationship("User")

    __table_args__ = {"mysql_charset": "utf8mb4", "mysql_collate": "utf8mb4_unicode_ci"}


