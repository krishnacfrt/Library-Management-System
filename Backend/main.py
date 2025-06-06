from fastapi import FastAPI, status, HTTPException
from Utils.User import User
from Utils.util import get_users, validate_user, remove_user
from Utils.Book import Book, getBooks

app = FastAPI()


@app.post("/users", status_code=status.HTTP_201_CREATED)
async def create_user(user: User):
    user.save_to_db()
    userId = user.get_last_commit()
    details = {"userDetail": user}
    details["userId"] = userId
    return {"message": "User added to the database", "user": details}


@app.delete("/user/{user_id}")
async def delete_user(user_id: int):
    isValidUser = validate_user(user_id)
    if isValidUser:
        remove_user(user_id)
        return {"status": "OK", "message": "User deleted successfully"}
    else:
        raise HTTPException(status_code=404, detail="User not found")


@app.get("/users", status_code=status.HTTP_200_OK)
async def getUsers():
    users = get_users()
    return {"message": "Users fetched successfully", "users": users}


@app.post("/book", status_code=status.HTTP_201_CREATED)
async def add_book(book: Book):
    msg = book.save_to_db()
    return {"message": msg}


@app.get("/books", status_code=status.HTTP_200_OK)
async def get_books():
    res = getBooks()
    return {"message": "Books fetched successfully", "books": res}
