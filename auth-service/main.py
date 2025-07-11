from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Dict
import jwt
import time

app = FastAPI()

users_db: Dict[str, str] = {}
SECRET_KEY = "your-secret-key"

class User(BaseModel):
    username: str
    password: str

@app.post("/register")
def register(user: User):
    if user.username in users_db:
        raise HTTPException(status_code=400, detail="Username already registered")
    users_db[user.username] = user.password
    return {"message": "User registered successfully"}

@app.post("/login")
def login(user: User):
    if users_db.get(user.username) != user.password:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    payload = {
        "sub": user.username,
        "iat": int(time.time()),
        "exp": int(time.time()) + 3600
    }
    token = jwt.encode(payload, SECRET_KEY, algorithm="HS256")
    return {"token": token}
