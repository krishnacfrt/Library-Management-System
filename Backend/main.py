from fastapi import FastAPI, status
from Utils.User import User
from Utils.util import get_users
from Utils.Book import Book, getBooks

app = FastAPI()


@app.post("/users", status_code=status.HTTP_201_CREATED)
async def create_user(user: User):
    user.save_to_db()
    return {"message": "User added to the database", "user": user}


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
