import mysql.connector
from dotenv import dotenv_values

environment = dotenv_values(".env")

database = None
database_cursor = None

def connect_database():
    global database
    global database_cursor

    try:
        database = mysql.connector.connect(
                        user=environment["MYSQL_USER"],
                        password=environment["MYSQL_PASSWORD"],
                        host=environment["MYSQL_HOST"],
                        database=environment["MYSQL_DATABASE"]
                    )
        database_cursor = database.cursor(dictionary=True)
    except mysql.connector.Error as err:
        if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
            print("Something is wrong with your user name or password")
        elif err.errno == errorcode.ER_BAD_DB_ERROR:
            print("Database does not exist")
        else:
            print(err)

def close_database():
    global database
    global database_cursor

    database_cursor.close()
    database.close()

def create(sql, data=None):
    try:
        global database
        global database_cursor
        create_data_id = None
        
        connect_database()
        database_cursor.execute(sql, data)
        database.commit()
        create_data_id = database_cursor.lastrowid
        close_database()
    except mysql.connector.Error as err:
        print(err)

    return create_data_id

def read(sql, data=None):
    try:
        global database
        global database_cursor
        read_data = None
        
        connect_database()
        database_cursor.execute(sql, data)
        read_data = database_cursor.fetchall()
        close_database
    except mysql.connector.Error as err:
        print(err)

    return read_data

def update(sql, data=None):
    try:
        global database
        global database_cursor
        
        connect_database()
        database_cursor.execute(sql, data)
        database.commit()
        close_database
    except mysql.connector.Error as err:
        print(err)
    
    return

def delete(sql, data=None):
    try:
        global database
        global database_cursor
        delete_data = None
        
        connect_database()
        database_cursor.execute(sql, data)
        database.commit()
        delete_data = database_cursor.rowcount
        close_database
    except mysql.connector.Error as err:
        print(err)
    
    return delete_data