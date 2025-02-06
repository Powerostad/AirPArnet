#!/usr/bin/env python3

from datetime import datetime, timedelta
from decimal import Decimal
import json
from typing import List

from sqlalchemy.exc import IntegrityError
from app.db.session import SessionLocal
from app.db.models import User, Flight, Booking, Airline, AirlineReview, AccountMoney


def create_airlines(db) -> List[Airline]:
    airlines_data = [
        {
            "name": "ایران ایر",
            "package_weight": Decimal("23.00"),
            "features": json.dumps({
                "meals": True,
                "wifi": False,
                "entertainment": True,
                "baggage_insurance": True
            }, ensure_ascii=False)
        },
        {
            "name": "ماهان ایر",
            "package_weight": Decimal("25.00"),
            "features": json.dumps({
                "meals": True,
                "wifi": True,
                "entertainment": True,
                "baggage_insurance": True
            }, ensure_ascii=False)
        },
        {
            "name": "آسمان",
            "package_weight": Decimal("20.00"),
            "features": json.dumps({
                "meals": True,
                "wifi": False,
                "entertainment": False,
                "baggage_insurance": True
            }, ensure_ascii=False)
        }
    ]

    airlines = []
    for airline_data in airlines_data:
        airline = Airline(**airline_data)
        db.add(airline)
        airlines.append(airline)

    return airlines


def create_users(db) -> List[User]:
    users_data = [
        {
            "email": "admin@flightservice.ir",
            "full_name": "مدیر سیستم",
            "hashed_password": "hashed_super_secure_password_123",  # In production, use proper password hashing
            "phone_number": "09121234567",
            "is_superuser": True
        },
        {
            "email": "user1@example.com",
            "full_name": "علی محمدی",
            "hashed_password": "hashed_password_123",
            "phone_number": "09129876543",
            "is_superuser": False
        },
        {
            "email": "user2@example.com",
            "full_name": "مریم احمدی",
            "hashed_password": "hashed_password_456",
            "phone_number": "09123456789",
            "is_superuser": False
        }
    ]

    users = []
    for user_data in users_data:
        user = User(**user_data)
        db.add(user)
        users.append(user)

    return users


def create_flights(db, airlines: List[Airline]) -> None:
    iranian_cities = [
        "تهران", "مشهد", "اصفهان", "شیراز", "تبریز", "کیش", "قشم"
    ]
    international_cities = [
        "Dubai", "Istanbul", "Frankfurt", "London", "Paris"
    ]

    class_types = ["Economy", "Business", "First"]
    base_time = datetime.now().replace(hour=0, minute=0, second=0, microsecond=0)

    for airline in airlines:
        # Domestic Flights
        for dep_city in iranian_cities:
            for arr_city in iranian_cities:
                if dep_city != arr_city:
                    for days in range(1, 31):  # Next 30 days
                        for class_type in class_types:
                            departure_time = base_time + timedelta(days=days, hours=8)
                            flight = Flight(
                                airline_id=airline.id,
                                flight_number=f"IR{airline.id}{days:03d}",
                                departure_city=dep_city,
                                arrival_city=arr_city,
                                departure_time=departure_time,
                                arrival_time=departure_time + timedelta(hours=2),
                                price_per_adult=Decimal("2000000.00"),  # 2 million Rials
                                price_per_child=Decimal("1500000.00"),
                                price_per_baby=Decimal("500000.00"),
                                available_seats=150,
                                is_international=False,
                                load_capacity=Decimal("1000.00"),
                                class_type=class_type
                            )
                            db.add(flight)

        # International Flights
        for dep_city in iranian_cities[:3]:  # Main cities only
            for arr_city in international_cities:
                for days in range(1, 31):
                    for class_type in class_types:
                        departure_time = base_time + timedelta(days=days, hours=12)
                        flight = Flight(
                            airline_id=airline.id,
                            flight_number=f"IR{airline.id}I{days:03d}",
                            departure_city=dep_city,
                            arrival_city=arr_city,
                            departure_time=departure_time,
                            arrival_time=departure_time + timedelta(hours=5),
                            price_per_adult=Decimal("10000000.00"),  # 10 million Rials
                            price_per_child=Decimal("8000000.00"),
                            price_per_baby=Decimal("2000000.00"),
                            available_seats=200,
                            is_international=True,
                            load_capacity=Decimal("2000.00"),
                            class_type=class_type
                        )
                        db.add(flight)


def create_sample_bookings(db, users: List[User]) -> None:
    flights = db.query(Flight).limit(10).all()

    for user in users:
        for flight in flights[:2]:  # 2 bookings per user
            booking = Booking(
                flight_id=flight.id,
                user_id=user.id,
                booking_date=datetime.now(),
                passengers=json.dumps([
                    {
                        "type": "adult",
                        "name": user.full_name,
                        "national_id": "1234567890"
                    }
                ], ensure_ascii=False),
                total_price=flight.price_per_adult,
                status="CONFIRMED"
            )
            db.add(booking)


def create_airline_reviews(db, users: List[User], airlines: List[Airline]) -> None:
    reviews = [
        "سرویس عالی و پرواز به موقع",
        "کیفیت غذا می‌تواند بهتر باشد",
        "تجربه پرواز خوبی بود"
    ]

    for user in users:
        for airline in airlines:
            review = AirlineReview(
                review_text=reviews[hash((user.id, airline.id)) % len(reviews)],
                user_id=user.id,
                airline_id=airline.id
            )
            db.add(review)


def create_account_money(db, users: List[User]) -> None:
    for user in users:
        account = AccountMoney(
            user_id=user.id,
            amount=Decimal("5000000.00")  # 50 million Rials
        )
        db.add(account)


def init() -> None:
    db = SessionLocal()
    try:
        # Create records in proper order due to foreign key constraints
        airlines = create_airlines(db)
        db.commit()

        users = create_users(db)
        db.commit()

        create_flights(db, airlines)
        db.commit()

        create_sample_bookings(db, users)
        db.commit()

        create_airline_reviews(db, users, airlines)
        db.commit()

        create_account_money(db, users)
        db.commit()

    except IntegrityError as e:
        db.rollback()
        print(f"Error occurred: {e}")
        raise
    finally:
        db.close()


if __name__ == "__main__":
    print("Database Initialization Start")
    init()
    print("Database Initialization Completed Successfully")