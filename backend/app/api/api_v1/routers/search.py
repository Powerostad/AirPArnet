from fastapi import APIRouter, Depends, HTTPException, status
from app.db.session import get_db


search_router = APIRouter(prefix="/search", tags=["search"])


@search_router.get("/")
async def search(db: Depends(get_db)):
    pass