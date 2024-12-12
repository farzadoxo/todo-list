from random import randint
from DATABASE.Db import DataBase
import logging
import os


class ResponseBody:
    """Make a response body (.json (dict)) using a ready
       template and inputs """

    def UserResponseBody(user: tuple):
        response_body = {
            "fullname": user[0],
            "email": user[1], 
            "password": user[2],
            "avatar_url": user[3]
        }

        return response_body


    def TodoResponseBody(task: tuple):
        response_body = {
            "id": task[0],
            "title": task[1],
            "completed": task[2],
            "dueDate": task[3],
            "priority" : task[4],
            "image_url" : task[5]
        }

        return response_body




class IDGenerator:
    def generate_id():
        id = randint(1000034456, 956456434782128923)

        DataBase.cursor.execute("SELECT id from todos")
        active_ids = DataBase.cursor.fetchall()

        for id_countaner in active_ids:
            if id_countaner == id:
                id = randint(1000034456, 956456434782128923)
                return id
            else:
                return id






def setup_logger(name, log_file, level=logging.INFO):
    """To setup as many loggers as you want"""
    formatter = logging.Formatter('%(asctime)s %(levelname)s %(message)s')

    handler = logging.FileHandler(log_file)        
    handler.setFormatter(formatter)

    logger = logging.getLogger(name)
    logger.setLevel(level)
    logger.addHandler(handler)

    return logger





class LoggerSetup:

    server_logger = setup_logger(name="ServerLogger",log_file='./API.log')
    user_logger = setup_logger(name="UserLogger",log_file='./USER.log')
    todo_logger = setup_logger(name="TodoLogger",log_file="./TODO.log")





class LogSystem:
    """Log all things happend in API and DATABASE
       Log users acctivity and todos status"""

    class TodoLog:
        """Log todos status (users.log)"""


        def on_todo_create(id:str):
            LoggerSetup.todo_logger.info("➕ New todo created! id : {}".format(id))

        def on_todo_remove(id:str):
            LoggerSetup.todo_logger.info("➖ Todo deleted! id : {}".format(id))
        
        def on_todo_update(id:str):
            LoggerSetup.todo_logger.info("🔝 Todo updated! id : {}".format(id))


    class UserLog:
        """Log user status (todos.log)"""


        def on_user_signup(email:str):
            LoggerSetup.user_logger.info("📝 New user signed up! email : {}".format(email))

        def on_user_login(email:str):
            LoggerSetup.user_logger.info("📲 User logedin! email : {}".format(email))

        def on_user_deleted(email:str):
            LoggerSetup.user_logger.info("🗑️ Account deleted! email : {}".format(email))
        
        def on_user_update(email:str):
            LoggerSetup.user_logger.info("🔝 User Updated! email : {}".format(email))