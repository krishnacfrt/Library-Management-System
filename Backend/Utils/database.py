import mysql.connector


db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="Krishna4321!",
    database="library_management",
)

cur = db.cursor(dictionary=True)

# print(db.connection_id)
# database and table > users, books, transactions is already created in sql
