from database import cur


def get_users():
    cur.execute("SELECT * FROM users")
    users = cur.fetchall()
    return users
