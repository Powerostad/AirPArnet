import os
from dotenv import load_dotenv

load_dotenv()

PROJECT_NAME = "parnet"

SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL")

API_V1_STR = "/api/v1"
