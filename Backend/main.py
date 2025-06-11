from fastapi import FastAPI, status, HTTPException
from Utils.User import User, get_user_by_id
from Utils.util import get_users, validate_user, remove_user
from Utils.Book import Book, getBooks, drptable, createTableBook, addBook
from Utils.Transaction import Transaction, SubmitBook
from Utils.Log import Log
from Utils.database import cur, db
from Utils.auth_service import (
    authenticate_librarian,
    register_admin,
    Auth,
    RegisterLibrarian,
)

app = FastAPI()


@app.post("/users", status_code=status.HTTP_201_CREATED)
async def create_user(user: User):
    user.save_to_db()
    userId = user.get_last_commit()
    details = {"userDetail": user}
    details["userId"] = userId
    return {"message": "User added to the database", "user": details}


@app.delete("/users/{user_id}")
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


@app.get("/users/{user_id}", status_code=status.HTTP_200_OK)
async def get_user(user_id: int):
    isValidUser = validate_user(user_id)
    if isValidUser:
        user = get_user_by_id(user_id)
        return {"message": "User fetched successfully", "user": user}
    else:
        raise HTTPException(status_code=404, detail="User not found")


@app.post("/books", status_code=status.HTTP_201_CREATED)
async def add_book(book: Book):
    createTableBook()
    msg = book.save_to_db()
    return {"message": msg}


# @app.get("/books", status_code=status.HTTP_200_OK)
# async def get_books():
#     # drptable()
#     createTableBook()
#     res = getBooks()
#     return {"message": "Books fetched successfully", "books": res}


@app.delete("/books/{book_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_book(book_id: int):
    createTableBook()
    query = "DELETE FROM newBooks WHERE bookid = %s"
    cur.execute(query, (book_id,))
    db.commit()
    return {"message": "Book deleted successfully"}


@app.post("/transaction", status_code=status.HTTP_201_CREATED)
async def add_transaction(books: Transaction):
    log = Log()
    books.createTransactionTable()
    if not books.books:
        raise HTTPException(status_code=400, detail="No books provided for transaction")

    if not validate_user(books.userId):
        raise HTTPException(status_code=404, detail="User not found")

    res = books.assignBook(log)
    return {"message": "Transaction completed successfully", "details": res}


@app.post("/submit", status_code=status.HTTP_201_CREATED)
async def submit_book(submit: SubmitBook):
    log = Log()

    res = submit.submit(log)
    if "error" in res:
        raise HTTPException(status_code=404, detail=res["error"])

    return {"message": "Book submitted successfully", "details": res}


@app.get("/logs", status_code=status.HTTP_200_OK)
async def get_logs():
    log = Log()
    logs = log.getLogs()
    if not logs:
        raise HTTPException(status_code=404, detail="No logs found")
    return {"message": "Logs fetched successfully", "logs": logs}


@app.get("/transactions", status_code=status.HTTP_200_OK)
async def get_transactions():
    query = "SELECT * FROM transactionDetail"
    cur.execute(query)
    transactions = cur.fetchall()
    if not transactions:
        raise HTTPException(status_code=404, detail="No transactions found")
    return {
        "message": "Transactions fetched successfully",
        "transactions": transactions,
    }


@app.post("/admin/authenticate", status_code=status.HTTP_200_OK)
async def authenticate_librarian_endpoint(auth: Auth):
    username = auth.username
    password = auth.password
    result = authenticate_librarian(username, password)
    if not result["success"]:
        raise HTTPException(status_code=401, detail=result["message"])
    return {"message": result["message"]}


@app.post("/admin/register", status_code=status.HTTP_201_CREATED)
async def register_librarian(args: RegisterLibrarian):
    username = args.username
    password = args.password
    security_code = args.security_code
    try:
        result = register_admin(username, password, security_code)
        return {"message": result["message"], "user_id": result["user_id"]}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


from fastapi import Query


@app.get("/books", status_code=status.HTTP_200_OK)
async def get_books(
    page: int = Query(1, ge=1),
    page_size: int = Query(10, ge=1, le=100),
    search_column: str = Query(None),
    search_value: str = Query(None),
):
    offset = (page - 1) * page_size

    # Basic SQL injection protection: only allow certain columns
    allowed_columns = {
        "title",
        "author",
        "category",
        "standard",
    }  # add your columns here
    where_clause = ""
    params = []

    if search_column and search_value and search_column in allowed_columns:
        where_clause = f"WHERE {search_column} LIKE %s"
        params.append(f"%{search_value}%")

    query = f"SELECT * FROM newBooks {where_clause} LIMIT %s OFFSET %s"
    params.extend([page_size, offset])
    cur.execute(query, tuple(params))
    books = cur.fetchall()

    cur.execute(f"SELECT COUNT(*) FROM newBooks {where_clause}", tuple(params[:-2]))
    row = cur.fetchone()
    total_books = list(row.values())[0]
    has_next = offset + page_size < total_books

    next_page_params = (
        {
            "page": page + 1,
            "page_size": page_size,
            "search_column": search_column,
            "search_value": search_value,
        }
        if has_next
        else None
    )

    return {
        "message": "Books fetched successfully",
        "books": books,
        "nextPageParams": next_page_params,
        "total": total_books,
        "page": page,
        "page_size": page_size,
    }


@app.get("/transaction/{bookid}", status_code=status.HTTP_200_OK)
async def get_transaction_by_bookid(bookid: int):
    query = "SELECT * FROM transactionDetail WHERE bookid = %s"
    cur.execute(query, (bookid,))
    transaction = cur.fetchone()
    if not transaction:
        raise HTTPException(
            status_code=404, detail="No transaction found for this book"
        )
    return transaction
