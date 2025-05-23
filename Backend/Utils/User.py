from pydantic import BaseModel
from database import cur, db
class User(BaseModel):
    name: str
    userId: int
    email: str
    contact: str

    def save_to_db(self):
        query='insert into users (userId, name, email,contact) values(%s, %s, %s, %s)'
        temp=(self.userId,self.name, self.email, self.contact)
        cur.execute(query, temp)
        db.commit()
