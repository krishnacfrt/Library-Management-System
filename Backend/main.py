from fastapi import FastAPI
from Utils.User import User
from Utils.util import get_users

app= FastAPI()

@app.post("/users/")
async def create_user(user: User, satus_code: 200):
    user.save_to_db()
    return {"message": "User added to the database", "user": user}


@app.get("/users/")
async def getUsers():
    users= get_users()
    return {"message": "Users fetched successfully", "users": users}

