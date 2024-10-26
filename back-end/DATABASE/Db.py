import sqlite3

class DataBase:
    """For use this class you should create a table called 'todos' 
    with coloumns : id-title-completed-dueDate
                    INTEGER-TEXT-BOOLEAN-TEXT
    or run this code :
    DataBase.cursor.execute("CREATE TABLE todos (id INTEGER , title TEXT , completed BOOLEAN , dueDate TEXT)")"""

    connection = sqlite3.connect("back-end/__tests__/database.db",check_same_thread=False)
    cursor = connection.cursor()


# Ready code for make todos table
#DataBase.cursor.execute("CREATE TABLE todos (id INTEGER , title TEXT , completed BOOLEAN , dueDate TEXT)")