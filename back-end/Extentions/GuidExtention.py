from DATABASE.Db import DataBase
from random import randint



class GuidGenerator:
    def generate_guid():
        id = randint(1000034456, 956456434782128923)

        DataBase.cursor.execute("SELECT id from todos")
        active_ids = DataBase.cursor.fetchall()

        for id_countaner in active_ids:
            if id_countaner == id:
                id = randint(1000034456, 956456434782128923)
                return id
            else:
                return id