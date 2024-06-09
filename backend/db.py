import pymysql

def connect_db():
    conn = pymysql.connect(
        host="localhost",
        user="root",
        password="",
        database="db_bansos",
        charset='utf8mb4',
        cursorclass=pymysql.cursors.DictCursor
    )
    return conn
