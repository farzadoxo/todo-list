from random import randint
from DATABASE.Db import DataBase


class ResponseBody:
    """Make a response body (.json (dict)) using a ready
       template and inputs """

    def UserResponseBody(user: tuple):
        response_body = {
            "fullname": user[0],
            "email": user[1], 
            "password": user[2]
        }

        return response_body

    def TodoResponseBody(task: tuple):
        response_body = {
            "id": task[0],
            "title": task[1],
            "completed": task[2],
            "dueDate": task[3],
        }

        return response_body


# class IDGenerator:
#     def generate_id():
#         id = randint(1000034456, 9564564347821289237)

#         DataBase.cursor.execute("SELECT id from todos")
#         active_ids = DataBase.cursor.fetchall()

#         for id_countaner in active_ids:
#             if id_countaner == id:
#                 id = randint(1000034456, 9564564347821289237)
#                 return id
#             else:
#                 return id


class LogSystem:
    """Log all things happend in API and DATABASE
       Log users acctivity and todos status"""

    class TodoLog:
        """Log todos status (users.log)"""

        def on_todo_add():
            ...

        def on_todo_remove():
            ...
        
        def on_todo_update():
            ...


    class UserLog:
        """Log user status (todos.log)"""

        def on_user_signup():
            ...

        def on_user_login():
            ...

        def on_account_deleted():
            ...