from fastapi import APIRouter, Request, Depends, Response, encoders, HTTPException
import typing as t

from fastapi import status

from app.core.security import get_password_hash, verify_password
from app.db.models import User
from app.db.session import get_db
from app.db.schemas import UserCreate, UserUpdate, UserOut, UserResponse, LoginRequest

users_router = r = APIRouter()


# @r.get(
#     "/users",
#     response_model=t.List[User],
#     response_model_exclude_none=True,
# )
# async def users_list(
#     response: Response,
#     db=Depends(get_db),
#     current_user=Depends(get_current_active_superuser),
# ):
#     """
#     Get all users
#     """
#     users = get_users(db)
#     # This is necessary for react-admin to work
#     response.headers["Content-Range"] = f"0-9/{len(users)}"
#     return users


# @r.get("/users/me", response_model=User, response_model_exclude_none=True)
# async def user_me(current_user=Depends(get_current_active_user)):
#     """
#     Get own user
#     """
#     return current_user


@r.get(
    "/users/{user_id}",
    response_model=UserResponse,
    response_model_exclude_none=True,
)
async def user_details(
    user_id: int,
    db=Depends(get_db)
):
    db_user = db.query(User).filter(User.id == user_id).first()
    if db_user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    return db_user


@r.delete(
    "/users/{user_id}/", response_model=UserResponse, response_model_exclude_none=True
)
async def user_delete(
    user_id: int,
    db=Depends(get_db)
):
    """
    Delete existing user
    """
    db_user = db.query(User).filter(User.id == user_id).first()
    if db_user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )

    db.delete(db_user)
    db.commit()
    return None


@r.put(
    "/users/{user_id}/", response_model=UserResponse, response_model_exclude_none=True
)
async def user_edit(
    user_id: int,
    user: UserUpdate,
    db=Depends(get_db)
):
    """
    Update existing user
    """
    db_user = db.query(User).filter(User.id == user_id).first()
    if db_user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )

    update_date = user.dict(exclude_unset=True)

    if "password" in update_date:
        update_date["hashed_password"] = get_password_hash(update_date["password"])

    for key, value in update_date.items():
        setattr(db_user, key, value)

    db.commit()
    db.refresh(db_user)
    return db_user


@r.post("/signup/", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def user_create(
    user: UserCreate,
    db=Depends(get_db)
):
    """
    Create a new user
    """
    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )

    hashed_password = get_password_hash(user.password)
    db_user = User(
        email=user.email,
        full_name=user.full_name,
        hashed_password=hashed_password,
        phone_number=user.phone_number,
        is_superuser=user.is_superuser,
        picture=user.picture
    )

    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


@r.post("/login")
def login(request: LoginRequest, db= Depends(get_db)):
    user = db.query(User).filter(User.email == request.email).first()
    if not user or not verify_password(request.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password"
        )

    return {
        "id": user.id,
        "email": user.email,
        "full_name": user.full_name,
        "phone_number": user.phone_number,
        "is_superuser": user.is_superuser,
        "picture": user.picture
    }
