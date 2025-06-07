from Utils.database import cur, db


class Log:
    def addLog(self, userId, bookId, title):
        self.createLogTable()
        # Check if bookId already exists in Log
        check_query = "SELECT 1 FROM Log WHERE bookid = %s"
        cur.execute(check_query, (bookId,))
        exists = cur.fetchone()
        if not exists:
            query = "INSERT INTO Log (bookid, title, userId) VALUES (%s, %s, %s)"
            values = (bookId, title, userId)
            cur.execute(query, values)
            db.commit()

    def createLogTable(self):
        query = """CREATE TABLE IF NOT EXISTS Log (
            bookid INT PRIMARY KEY,
            title VARCHAR(255), 
            userId INT(255),
            date DATETIME DEFAULT CURRENT_TIMESTAMP
        )"""

        cur.execute(query)
        db.commit()

    def getLogs(self):
        query = "SELECT * FROM Log"
        cur.execute(query)
        logs = cur.fetchall()
        return logs


async def clear_all_tables():
    try:
        cur.execute("DELETE FROM newBooks")
        cur.execute("DELETE FROM transactionDetail")
        cur.execute("DELETE FROM Log")
        db.commit()
        return {
            "message": "All entries removed from newBooks, transactionDetail, and Log tables."
        }
    except Exception as e:
        db.rollback()
        return {"error": str(e)}


# clear_all_tables()
