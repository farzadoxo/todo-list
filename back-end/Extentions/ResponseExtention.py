import jwt
import json


class ResponseBody:
    """Make a response body (.json (dict)) using a ready
       template and inputs """

    def UserResponseBody(user: tuple):
        response_body = {
            "full_name": jwt.decode(user[0],"secret",algorithms="HS256")['full_name'],
            "email": jwt.decode(user[1],"secret",algorithms="HS256")['email'], 
            "password": jwt.decode(user[2],"secret",algorithms="HS256")['password'],
            "avatar_url": user[3]
        }

        return response_body


    def TodoResponseBody(task: tuple):
        response_body = {
            "id": task[0],
            "owner" : jwt.decode(task[1],"secret",algorithms="HS256")['owner'], 
            "title": task[2],
            "completed": task[3],
            "dueDate": task[4],
            "priority" : task[5],
            "image_url" : task[6]
        }

        return response_body


    def AllTodoResponseBody(todos:list):
        temp_dict = {}
        resault_dict = """{"todos" :[]}"""

        data = json.loads(resault_dict)

        for i in todos:
            temp_dict = {
                "id" : i[0],
                "title" : i[2],
                "completed" : i[3],
                "dueDate" : i[4],
                "priority" : i[5],
                "image_url" : i[6]
            }
            
            data["todos"].append(temp_dict)

        return(data)