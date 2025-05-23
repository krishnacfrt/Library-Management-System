from fastapi import FastAPI
from Utils.User import User

app= FastAPI()

@app.post("/users/")
async def create_user(user: User, satus_code: 200):
    user.save_to_db()
    return {"message": "User added to the database", "user": user}



