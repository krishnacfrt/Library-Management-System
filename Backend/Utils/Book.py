from pydantic import BaseModel
from datetime import datetime
from Utils.database import cur, db


class Book(BaseModel):
    title: str
    published_date: str
    author: str
    standard: int
    category: str

    def save_to_db(self):
        query = "insert into newBooks ( title, author, published_date, standard, category) values ( %s, %s, %s,%s, %s)"
        # date_object = datetime.strptime(self.published_date, "%Y-%m-%d").date()
        val = (
            self.title,
            self.author,
            self.published_date,
            self.standard,
            self.category,
        )
        cur.execute(query, val)
        db.commit()
        return "added book successfully"


def getBooks(bookid=None):
    if bookid:
        query = "select * from newBooks where bookid = %s"
        cur.execute(query, (bookid,))
        books = cur.fetchall()
        return books
    else:
        return "Not found"


def drptable():
    cur.execute("DROP TABLE books;")


def createTableBook():
    query = """CREATE TABLE IF NOT EXISTS newBooks (
            bookid INT PRIMARY KEY AUTO_INCREMENT,
            title VARCHAR(255), 
            author VARCHAR(255),
            standard VARCHAR(50),
            category VARCHAR(50)
        )"""

    cur.execute(query)
    db.commit()


def addBook():
    query = "insert into newBooks (title, author, standard, category) values (%s, %s, %s, %s)"
    temp = ("new book", "krishna", 3, "phys")
    cur.execute(query, temp)
    db.commit()
