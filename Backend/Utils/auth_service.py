import bcrypt
from Utils.database import db, cur as cursor
from pydantic import BaseModel

ADMIN_SECURITY_CODE = "SECRET123"


class Auth(BaseModel):
    username: str
    password: str


class RegisterLibrarian(BaseModel):
    username: str
    password: str
    security_code: str


def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")


def verify_password(password: str, hashed: str) -> bool:
    return bcrypt.checkpw(password.encode("utf-8"), hashed.encode("utf-8"))


def ensure_librarian_table():
    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS librarian (
            id INTEGER PRIMARY KEY AUTO_INCREMENT,
            username VARCHAR(255) UNIQUE NOT NULL,
            password_hash VARCHAR(255) NOT NULL
        )
    """
    )
    db.commit()


def authenticate_librarian(username, password):
    ensure_librarian_table()
    cursor.execute(
        "SELECT password_hash FROM librarian WHERE username = %s", (username,)
    )
    row = cursor.fetchone()
    if row is None:
        return {"success": False, "message": "User does not exist"}
    if verify_password(password, row["password_hash"]):
        return {"success": True, "message": "Authentication successful"}
    else:
        return {"success": False, "message": "Invalid credentials"}


def register_admin(username, password, security_code):
    ensure_librarian_table()
    if security_code != ADMIN_SECURITY_CODE:
        raise Exception("Invalid security code")
    cursor.execute("SELECT id FROM librarian WHERE username = %s", (username,))
    if cursor.fetchone():
        raise Exception("Username already exists")
    hashed = hash_password(password)
    cursor.execute(
        "INSERT INTO librarian (username, password_hash) VALUES (%s, %s)",
        (username, hashed),
    )
    db.commit()
    user_id = cursor.lastrowid
    return {
        "success": True,
        "message": "Admin registered successfully",
        "user_id": user_id,
    }
