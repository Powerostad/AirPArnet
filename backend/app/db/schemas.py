from pydantic import BaseModel, EmailStr
import typing as t

from app.db.models import Booking


class UserBase(BaseModel):
    email: EmailStr
    full_name: str
    phone_number: t.Optional[str] = None
    is_superuser: bool = False
    picture: str = "default_profile.jpg"


class UserOut(UserBase):
    pass


class UserCreate(UserBase):
    password: str

    class Config:
        orm_mode = True


class UserUpdate(BaseModel):
    email: t.Optional[EmailStr] = None
    full_name: t.Optional[str] = None
    phone_number: t.Optional[str] = None
    picture: t.Optional[str] = None
    password: t.Optional[str] = None


class UserResponse(UserBase):
    id: int

    class Config:
        orm_mode = True

class UserWithBookings(UserBase):
    bookings: t.List["Booking"] = []

    class Config:
        arbitrary_types_allowed = True


