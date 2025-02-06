#!/usr/bin/env python3

from datetime import datetime, timedelta
from decimal import Decimal
import json
from typing import List

from sqlalchemy.orm import Session
from app.db.session import SessionLocal
from app.db.models import User, Flight, Booking, Airline, AirlineReview, AccountMoney


def create_airlines(db: Session) -> List[Airline]:
    airlines = [
        Airline(
            name="ایران ایر",
            package_weight=Decimal("23.00"),
            features=json.dumps({
                "meal": True,
                "wifi": True,
                "entertainment": True
            })
        ),
        Airline(
            name="ماهان",
            package_weight=Decimal("25.00"),
            features=json.dumps({
                "meal": True,
                "wifi": False,
                "entertainment": True
            })
        ),
        Airline(
            name="آسمان",
            package_weight=Decimal("20.00"),
            features=json.dumps({
                "meal": True,
                "wifi": False,
                "entertainment": False
            })
        )
    ]
    for airline in airlines:
        db.add(airline)
    db.commit()
    return airlines


def create_users(db: Session) -> List[User]:
    users = [
        User(
            email="admin@example.com",
            full_name="مدیر سیستم",
            hashed_password="$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW",  # "password"
            is_superuser=True,
            phone_number="09121234567"
        ),
        User(
            email="user@example.com",
            full_name="کاربر عادی",
            hashed_password="$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW",  # "password"
            is_superuser=False,
            phone_number="09129876543"
        )
    ]
    for user in users:
        db.add(user)
    db.commit()
    return users


def create_flights(db: Session, airlines: List[Airline]) -> List[Flight]:
    # Iranian cities
    cities = ["تهران", "مشهد", "اصفهان", "شیراز", "تبریز", "کیش"]
    # International cities
    international_cities = ["استانبول", "دبی", "دوحه", "فرانکفورت", "لندن"]

    flights = []
    current_time = datetime.now()

    # Create domestic flights
    for airline in airlines:
        for dep_city in cities:
            for arr_city in cities:
                if dep_city != arr_city:
                    # Morning flight
                    morning_dep = current_time.replace(hour=8, minute=0) + timedelta(days=1)
                    morning_arr = morning_dep + timedelta(hours=2)

                    flights.append(Flight(
                        airline_id=airline.id,
                        flight_number=f"IR{len(flights) + 1:04d}",
                        departure_city=dep_city,
                        arrival_city=arr_city,
                        departure_time=morning_dep,
                        arrival_time=morning_arr,
                        price_per_adult=Decimal("2500000.00"),  # 2.5M Tomans
                        price_per_child=Decimal("1800000.00"),
                        price_per_baby=Decimal("500000.00"),
                        available_seats=120,
                        is_international=False,
                        load_capacity=Decimal("1000.00"),
                        class_type="اکونومی"
                    ))

    # Create international flights
    for airline in airlines:
        for dep_city in cities[:3]:  # Only major cities have international flights
            for arr_city in international_cities:
                # Evening international flight
                evening_dep = current_time.replace(hour=20, minute=0) + timedelta(days=1)
                evening_arr = evening_dep + timedelta(hours=5)

                flights.append(Flight(
                    airline_id=airline.id,
                    flight_number=f"IR{len(flights) + 1:04d}",
                    departure_city=dep_city,
                    arrival_city=arr_city,
                    departure_time=evening_dep,
                    arrival_time=evening_arr,
                    price_per_adult=Decimal("12000000.00"),  # 12M Tomans
                    price_per_child=Decimal("9000000.00"),
                    price_per_baby=Decimal("2000000.00"),
                    available_seats=180,
                    is_international=True,
                    load_capacity=Decimal("2000.00"),
                    class_type="بیزینس"
                ))

    for flight in flights:
        db.add(flight)
    db.commit()
    return flights


def create_bookings(db: Session, users: List[User], flights: List[Flight]) -> None:
    # Create different booking scenarios
    bookings = [
        # Single passenger, one-way domestic flight
        Booking(
            flight_id=flights[0].id,
            user_id=users[1].id,
            booking_date=datetime.now(),
            passengers=json.dumps([{
                "type": "adult",
                "name": "علی محمدی",
                "national_id": "0012345678",
                "birthdate": "1985-06-15"
            }]),
            total_price=flights[0].price_per_adult,
            status="CONFIRMED"
        ),
        # Family booking with return international flight
        Booking(
            flight_id=flights[-1].id,
            return_flight_id=flights[-2].id,
            user_id=users[1].id,
            booking_date=datetime.now(),
            passengers=json.dumps([
                {
                    "type": "adult",
                    "first_name": "رضا",
                    "last_name": "احمدی",
                    "national_id": "0023456789",
                    "birthdate": "1980-04-22"
                },
                {
                    "type": "adult",
                    "first_name": "مریم",
                    "last_name": "احمدی",
                    "national_id": "0034567890",
                    "birthdate": "1982-09-10"
                },
                {
                    "type": "child",
                    "first_name": "سارا",
                    "last_name": "احمدی",
                    "national_id": "0045678901",
                    "birthdate": "2015-07-30"
                }
            ]),
            total_price=Decimal("33000000.00"),  # Combined price for all passengers
            status="PENDING"
        )
    ]

    for booking in bookings:
        db.add(booking)
    db.commit()


def create_airline_reviews(db: Session, users: List[User], airlines: List[Airline]) -> None:
    reviews = [
        AirlineReview(
            review_text="پرواز بسیار خوب و به موقع بود",
            user_id=users[1].id,
            airline_id=airlines[0].id
        ),
        AirlineReview(
            review_text="سرویس غذا می‌تونست بهتر باشه",
            user_id=users[1].id,
            airline_id=airlines[1].id
        )
    ]

    for review in reviews:
        db.add(review)
    db.commit()


def create_account_money(db: Session, users: List[User]) -> None:
    accounts = [
        AccountMoney(
            user_id=users[0].id,
            amount=Decimal("50000000.00")  # 50M Tomans
        ),
        AccountMoney(
            user_id=users[1].id,
            amount=Decimal("10000000.00")  # 10M Tomans
        )
    ]

    for account in accounts:
        db.add(account)
    db.commit()


def init() -> None:
    db = SessionLocal()
    try:
        # Create data in order of dependencies
        airlines = create_airlines(db)
        users = create_users(db)
        flights = create_flights(db, airlines)
        create_bookings(db, users, flights)
        create_airline_reviews(db, users, airlines)
        create_account_money(db, users)
    finally:
        db.close()


if __name__ == "__main__":
    print("Database Initialization Start")
    init()
    print("Database Initialization Completed Successfully")