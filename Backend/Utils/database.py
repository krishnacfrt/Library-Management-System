# import mysql.connector


# db = mysql.connector.connect(
#     host="localhost",
#     user="root",
#     password="Krishna4321!",
#     database="library_management",
# )

import os
import mysql.connector

db = mysql.connector.connect(
    host=os.environ.get("DB_HOST"),
    user=os.environ.get("DB_USER"),
    password=os.environ.get("DB_PASSWORD"),
    database=os.environ.get("DB_NAME"),
    port=int(os.environ.get("DB_PORT", 3306)),
)

cur = db.cursor(dictionary=True)

# print(db.connection_id)
# database and table > users, books, transactions is already created in sql
