from pydantic import BaseModel
from Utils.database import cur, db


class User(BaseModel):
    name: str
    email: str
    contact: str

    def save_to_db(self):
        query = "insert into users ( name, email,contact) values( %s, %s, %s)"
        temp = (self.name, self.email, self.contact)
        cur.execute(query, temp)
        db.commit()

    def get_last_commit(self):
        query = "SELECT LAST_INSERT_ID()"
        cur.execute(query)
        lastCommit = cur.fetchall()
        return lastCommit[0]["LAST_INSERT_ID()"]
