from typing import List
from fastapi import Depends, HTTPException, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from datetime import date
import read
from fastapi_cloudauth.auth0 import Auth0, Auth0CurrentUser, Auth0Claims
from errors import ParticipantNotFoundError, ArgumentError, DatabaseError

domain = "dev-uvo2t7-y.au.auth0.com"
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


get_current_user = Auth0CurrentUser(domain=domain)


@app.get("/participants/")
def get_participants(org: str, purpose: str):
    try:
        participants = read.get_participants(org=org, purpose=purpose)
        return participants
    except ArgumentError as e:
        return {"error": e}


@app.get("/participant/")
def get_participant(
    family_name: str, given_name: str, date_of_birth: str, org: str, purpose: str
):
    try:
        participant = read.get_participant(
            family_name=family_name,
            given_name=given_name,
            date_of_birth=date_of_birth,
            org=org,
            purpose=purpose,
        )
        return participant
    except (ParticipantNotFoundError, ArgumentError, DatabaseError) as e:
        return {"error": e}


@app.get("/")
async def root():
    return {"message": "ctrl"}
