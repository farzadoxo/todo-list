import sqlite3
import os


class DataBase:
    """For use this class you should create a table called 'todos'
    with coloumns : id-title-completed-dueDate
                    INTEGER-TEXT-BOOLEAN-TEXT
    or run this code :
    DataBase.cursor.execute("CREATE TABLE todos (id INTEGER , title TEXT , completed BOOLEAN , dueDate TEXT)")"""

    current_dir = os.getcwd()
    db_path = os.path.join(current_dir, "DATABASE", "database.db")
    connection = sqlite3.connect(db_path, check_same_thread=False)
    cursor = connection.cursor()


# Ready code for make todos table
DataBase.cursor.execute("CREATE TABLE todos (id INTEGER , title TEXT , completed BOOLEAN , dueDate TEXT)")
