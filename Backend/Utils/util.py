from database import cur, db


def get_users():
    cur.execute("SELECT * FROM users")
    users = cur.fetchall()
    return users


def validate_user(userId):
    query = f"select * from users where userId = {userId}"
    cur.execute(query)
    res = cur.fetchall()
    if res:
        return True
    return False


def remove_user(userId):
    query = f"DELETE FROM users WHERE userId= {userId}"
    cur.execute(query)
    db.commit()
