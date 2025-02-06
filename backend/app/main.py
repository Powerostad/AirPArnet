from fastapi import FastAPI
from fastapi.requests import Request
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from app.api.api_v1.routers.search import search_router
from app.api.api_v1.routers.users import users_router
from app.api.api_v1.routers.orders import order_router
from app.core import config
from app.db.session import SessionLocal


app = FastAPI(
    title=config.PROJECT_NAME, docs_url="/api/docs", openapi_url="/api"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.middleware("http")
async def db_session_middleware(request: Request, call_next):
    request.state.db = SessionLocal()
    response = await call_next(request)
    request.state.db.close()
    return response


@app.get("/api/v1")
async def root():
    return {"message": "Hello World"}


# Routers
app.include_router(
    users_router,
    prefix="/api/v1",
    tags=["users"],
)
app.include_router(search_router, prefix="/api/v1", tags=["search"])
app.include_router(order_router, prefix="/api/v1", tags=["orders"])

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", reload=True, port=8000)
