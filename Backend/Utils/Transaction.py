from pydantic import BaseModel
from Utils.database import cur, db
from datetime import datetime


class Transaction(BaseModel):
    userId: int
    books: list[int]

    def deleteBook(self, bookId, table):
        del_query = f"DELETE FROM {table} WHERE bookId = {bookId}"
        cur.execute(del_query)
        db.commit()

    def getSpecificBook(self, bookId, table):
        query = f"select * from {table} where bookId= {bookId}"
        cur.execute(query)
        bookDetail = cur.fetchall()
        return bookDetail

    def isValidBook(self, bookId, table):
        query = f"select * from {table} where bookId= {bookId}"
        cur.execute(query)
        book = cur.fetchall()
        if book:
            return True
        return False

    def addBook(self, values, columns, table):
        query = f"INSERT INTO {table} ({', '.join(columns)}) VALUES ({', '.join(['%s'] * len(values))})"
        cur.execute(query, values)
        db.commit()
        return "Book added successfully"

    def addBookToTransactionTable(self, values, columns, table):
        print(columns, values)
        self.createTransactionTable()
        val = ["%s" for _ in values]
        columns = ", ".join(columns)
        val = ", ".join(val)
        query = f"INSERT INTO {table} ({columns}) VALUES ({val})"
        print(query)
        cur.execute(query, values)
        db.commit()
        return "Book added successfully"

    def createTransactionTable(self):
        query = """CREATE TABLE IF NOT EXISTS transactionDetail (
                bookid INT PRIMARY KEY,
                title VARCHAR(255), 
                author VARCHAR(255),
                standard VARCHAR(50),
                category VARCHAR(50),
                published_date VARCHAR(50),
                userId INT(255)
            )"""

        cur.execute(query)
        db.commit()

    def assignBook(self, log):
        books = self.books
        userId = self.userId
        assignedBooks = []
        notAssignedBooks = []
        for bookId in books:
            if not self.isValidBook(bookId, "newBooks"):
                notAssignedBooks.append(bookId)
                continue
            bookDetail = self.getSpecificBook(bookId, "newBooks")[0]
            values = []
            for val in bookDetail.values():
                values.append(val)
            self.deleteBook(bookId, "newBooks")
            values.append(userId)
            values = tuple(values)
            columns = (
                "bookid",
                "title",
                "author",
                "standard",
                "category",
                "published_date",
                "userId",
            )
            self.addBookToTransactionTable(values, columns, "transactionDetail")
            assignedBooks.append(bookId)
            print(bookDetail, "****")
            log.addLog(userId, bookId, bookDetail["title"])
        res = {"assigned": assignedBooks, "not-assigned": notAssignedBooks}
        print(res)
        return res


class SubmitBook(BaseModel):
    bookId: int

    def submit(self, log):
        bookId = self.bookId
        query = "SELECT * FROM transactionDetail WHERE bookid =%s"
        cur.execute(query, (bookId,))
        bookDetail = cur.fetchone()
        if not bookDetail:
            return {"error": "Book not found in transactions"}
        bookid, title, author, standard, category, published_date, userId = list(
            bookDetail.values()
        )
        self.insertBook(bookid, title, author, standard, category)
        self.delBook(bookId)
        log.addLog(userId, bookid, title)

        return {"success": True, "message": "Book submitted successfully"}

    def insertBook(self, bookid, title, author, standard, category):
        check_query = "SELECT 1 FROM newBooks WHERE bookId = %s"
        cur.execute(check_query, (bookid,))
        exists = cur.fetchone()
        if not exists:
            insert_query = """
                    INSERT INTO newBooks (bookId, title, author, standard, category)
                    VALUES (%s, %s, %s, %s, %s)
                """
            cur.execute(insert_query, (bookid, title, author, standard, category))
            db.commit()
            print("inserted *******************************")

    def delBook(self, bookId):
        del_query = "DELETE FROM transactionDetail WHERE bookId = %s"
        cur.execute(del_query, (bookId,))
        db.commit()
        return "Book deleted successfully"
