from pydantic import BaseModel
from database import cur, db
from datetime import datetime


class Transaction(BaseModel):
    userId: int
    bookId: int

    def assign_book(self):
        userId = self.userId
        bookId = self.bookId
        date = datetime.date()
        query = "select * from books where userId= {userId}"
        bookDetails = cur.execute(query)
        query = "DELETE FROM book WHERE book_id = {bookId}"
        cur.execute(query)
        bookId, title = bookDetails
        query = (
            query
        ) = "insert into transactions (bookId, userId,bookTitle, transactionDate) values (%s, %s, %s, %s)"
        temp = (bookId, userId, title, date)
        cur.execute(query, temp)
        db.commit()


def submit_book(bookId):
    del_query = "DELETE FROM book WHERE book_id = {bookId}"
    add_query = "insert into books (bookId, title, author, published_date) values (%s, %s, %s, %s)"
    pass
