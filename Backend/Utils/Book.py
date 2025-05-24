from pydantic import BaseModel
from datetime import datetime
from database import cur, db


class Book(BaseModel):
    title: str
    bookId: int
    published_date: str
    author: str

    def save_to_db(self):
        query = "insert into books (bookId, title, author, published_date) values (%s, %s, %s, %s)"
        date_object = datetime.strptime(self.published_date, "%Y-%m-%d").date()
        val = (self.bookId, self.title, self.author, date_object)
        cur.execute(query, val)
        db.commit()
        return "added book successfully"


def getBooks():
    query = "select * from books"
    cur.execute(query)
    books = cur.fetchall()
    return books
