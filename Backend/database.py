import mysql.connector

db= mysql.connector.connect(host='localhost', user='root', password='Krishna4321!')

print(db.connection_id)