import os
from dotenv import load_dotenv
import mysql.connector
from mysql.connector import Error

load_dotenv()


db = mysql.connector.connect(
    host=os.getenv("MYSQL_HOST"),
    port=int(os.getenv("MYSQL_PORT", 3306)),
    user=os.getenv("MYSQL_USER"),
    password=os.getenv("MYSQL_PASSWORD"),
    database=os.getenv("MYSQL_DATABASE"),
)
cur = db.cursor(dictionary=True)
