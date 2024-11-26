from random import randint
from DATABASE.Db import DataBase


class ResponseBody:

    def UserResponseBody(user: tuple):
        response_body = {
            "fullname": user[0],
            "email": user[1], 
            "password": user[2]
        }

        return response_body

    def TaskResponseBody(task: tuple):
        response_body = {
            "id": task[0],
            "title": task[1],
            "completed": task[2],
            "dueDate": task[3],
        }

        return response_body


class IDGenerator:
    def generate_id():
        id = randint(1000034456, 9564564347821289237)

        DataBase.cursor.execute("SELECT id from todos")
        active_ids = DataBase.cursor.fetchall()

        for id_countaner in active_ids:
            if id_countaner == id:
                id = randint(1000034456, 9564564347821289237)
                return id
            else:
                return id

