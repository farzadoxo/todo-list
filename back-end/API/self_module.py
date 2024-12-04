from random import randint
# from DATABASE.Db import DataBase
import logging


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

formatter = logging.Formatter('%(asctime)s %(levelname)s %(message)s')

def setup_logger(name, log_file, level=logging.INFO):
    """To setup as many loggers as you want"""

    handler = logging.FileHandler(log_file)        
    handler.setFormatter(formatter)

    logger = logging.getLogger(name)
    logger.setLevel(level)
    logger.addHandler(handler)

    return logger



class LogSystem:
    """Log all things happend in API and DATABASE
       Log users acctivity and todos status"""

    class TodoLog:
        """Log todos status (users.log)"""

        



        def on_todo_add(id:str):
            todo_logger = setup_logger(name="TodoLogger",log_file="./TODO.log")
            todo_logger.info()

        def on_todo_remove(id:str):
            ...
        
        def on_todo_update(id:str):
            ...


    class UserLog:
        """Log user status (todos.log)"""


        def on_user_signup(email:str):
            user_logger = setup_logger(name="UserLogger",log_file='./USER.log')
            user_logger.info("bye")

        def on_user_login(email:str):
            ...

        def on_account_deleted(email:str):
            ...

if __name__ == "__main__":
    LogSystem.TodoLog.on_todo_add(id="sdfssdf")
    LogSystem.UserLog.on_user_signup(email="sdfdsf")