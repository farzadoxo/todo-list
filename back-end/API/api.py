from API.models import (NewTodo, UpdateTodo, SignUp, Login, UpdateAccountInfo , UpdateProfileInfo)
from API.self_module import (ResponseBody , LogSystem , IDGenerator)
from DATABASE.Db import DataBase
from fastapi import (status, HTTPException, APIRouter, Response , File , UploadFile)
from fastapi.responses import JSONResponse
import os


# router instanse
router = APIRouter()


# --------------------     User Section     --------------------

@router.post(
    '/api/account/signup',
    status_code=status.HTTP_201_CREATED,
    summary="Create Account",
    description="Create account need a request body with 3 item (username , email , password)"
)
def signup(reqbody:SignUp , response:Response):
    # fetch availeble user from database
    DataBase.cursor.execute(
        f"SELECT * FROM users WHERE email = '{reqbody.email.lower()}'"
    )
    user = DataBase.cursor.fetchone()

    if user != None:
        response.status_code = status.HTTP_409_CONFLICT
        return "This email has already been used !"
    else:
        try:
            if len(reqbody.password) >= 8:
                # create a recorde (user signup)
                user_values = (reqbody.full_name,reqbody.email.lower(),reqbody.password,None)
                DataBase.cursor.execute(
                    f"INSERT INTO users VALUES (?,?,?,?)" , user_values
                )
                DataBase.connection.commit()
                # Log 
                LogSystem.UserLog.on_user_signup(email=reqbody.email)

                # refetch user from database
                DataBase.cursor.execute(
                    f"SELECT * FROM users WHERE email = '{reqbody.email.lower()}'"
                )
                user = DataBase.cursor.fetchone()

                # Returned 
                return ResponseBody.UserResponseBody(user=user)
            else:
                response.status_code = status.HTTP_400_BAD_REQUEST
                return "Password must be 8 character !"
            

            
        except Exception or HTTPException as error :
            response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
            return f"ERROR >>> {error}"





@router.get(
    '/api/account/login',
    status_code= status.HTTP_200_OK,
    summary="Login to account",
    description="Login to a account using email and password"
)
def login(reqbody:Login , response : Response):
    # Fetch user info from database
    DataBase.cursor.execute(
        f"SELECT * FROM users WHERE email = '{reqbody.email.lower()}'"
    )
    user = DataBase.cursor.fetchone()

    try:
        if user == None:
            response.status_code = status.HTTP_401_UNAUTHORIZED
            return "User Not Found !"
        
        else:
            if reqbody.email.lower() == user[1] and reqbody.password == user[2]:
                # Log 
                LogSystem.UserLog.on_user_login(email=reqbody.email)

                return ResponseBody.UserResponseBody(user=user)
                         
            else:
                response.status_code = status.HTTP_400_BAD_REQUEST
                return "Password Invalid !"
            
    except Exception or HTTPException as error:
        response.status_code = status.WS_1011_INTERNAL_ERROR
        return f"ERROR >>> {error}"




# @router.patch(
#     '/api/account/edit',
#     status_code= status.HTTP_201_CREATED,
#     summary="Change account info",
#     description="Change account info or update profile info"
# )
# def edit_account_info(reqbody:UpdateAccountInfo , email : str , response:Response):
#     # fetch data from database
#     DataBase.cursor.execute(
#         f"SELECT * FROM users WHERE email = '{email.lower()}'"
#     )
#     user = DataBase.cursor.fetchone()

#     try:
#         if user != None:
#             # Set new email
#             if reqbody.email != None:
#                 if reqbody.email.lower() != user[1]:
#                     DataBase.cursor.execute(
#                         f"UPDATE users SET email = '{reqbody.email.lower()}' WHERE email = '{email.lower()}'"
#                     )
#                     DataBase.connection.commit()
#                 else:
#                     response.status_code = status.HTTP_409_CONFLICT
#                     return "New email cannot be the same as the current email!"
            
#             # Set new password
#             if reqbody.password != None:
#                 if reqbody.password != user[2] and len(reqbody.password) >= 8:
#                     DataBase.cursor.execute(
#                         f"UPDATE users SET password = '{reqbody.password}' WHERE email = '{email.lower()}'"
#                     )
#                     DataBase.connection.commit()
#                 else:
#                     response.status_code = status.HTTP_400_BAD_REQUEST
#                     return "The new password must be 8 characters long and cannot be the same as the current password!"
            
            
#             if reqbody.email != None:
#                 DataBase.cursor.execute(
#                     f"SELECT * FROM users WHERE email = '{reqbody.email.lower()}'"
#                 )
#                 user = DataBase.cursor.fetchone()

#                 return ResponseBody.UserResponseBody(user=user)

#             else:
#                 DataBase.cursor.execute(
#                     f"SELECT * FROM users WHERE email = '{email.lower()}'"
#                 )
#                 user = DataBase.cursor.fetchone()

#                 return ResponseBody.UserResponseBody(user=user)

#         else:
#             response.status_code = status.HTTP_404_NOT_FOUND
#             return "User Not Found !"
    
#     except Exception or HTTPException as error:
#         response.status_code = status.WS_1011_INTERNAL_ERROR
#         return f"ERROR >>> {error}"




# @router.patch(
#     '/api/profile/edit',
#     status_code=status.HTTP_201_CREATED,
#     summary="Change profile info",
#     description="Change profile info like FullName or Avatar"
# )
# def edit_profile_info(reqbody:UpdateProfileInfo , email : str , response : Response):
#     # fetch user from database
#     DataBase.cursor.execute(
#         f"SELECT * FROM user WHERE email = '{email.lower()}'"
#     )
#     user = DataBase.cursor.fetchone()

#     if user != None:
        
#         if reqbody.full_name != None:
#             if reqbody.full_name != user[0]:
#                 DataBase.cursor.execute(
#                     f"UPDATE users SET full_name = '{reqbody.full_name}' WHERE email = '{email.lower()}')"
#                 )
#                 DataBase.connection.commit()
#             else:
#                 response.status_code = status.HTTP_400_BAD_REQUEST
#                 return "New name cannot be the same as the current name !"
    

#         if reqbody.avatar != None:
#             DataBase.cursor.execute(
#                 f"UPDATE users SET avatar = '{reqbody.avatar}' WHERE email = '{email.lower()}'"
#             )
#             DataBase.connection.commit()



#         DataBase.cursor.execute(
#             f"SELECT * FROM users WHERE email = '{email.lower()}'"
#         )
#         user = DataBase.cursor.fetchone()

#         return ResponseBody.UserResponseBody(user=user)
    
#     else:
#         response.status_code = status.HTTP_404_NOT_FOUND
#         return "User Not Found !"



# --------------------     Task Section      -------------------

@router.get(
    '/api/todos',
    status_code= status.HTTP_200_OK,
    summary="Show all user todos",
    description="Fetch All user todos from database and show it"
)
def get_todos(response:Response):
    try:
        # Make a query and Fetch todos from database
        DataBase.cursor.execute(
            "SELECT * FROM todos"
        )
        todos = DataBase.cursor.fetchall()

        # Return todos
        return JSONResponse(content={"todos" : todos})
    
    except Exception or HTTPException as error:
        response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
        return f"ERROR >>> {error}"
    



@router.post(
    '/api/todos',
    status_code= status.HTTP_201_CREATED,
    summary="Create new todo",
    description="Create a new task and save it on database"
)
def new_todo(reqbody:NewTodo , response:Response):
    
    try:
        id = IDGenerator.generate_id()
        task_value = (id,reqbody.title , reqbody.completed , reqbody.dueDate , reqbody.priority , None)
        DataBase.cursor.execute(
            f"INSERT INTO todos VALUES (?,?,?,?,?,?)", task_value
        )
        DataBase.connection.commit()
        

        # Log 
        LogSystem.TodoLog.on_todo_create(id=id)

        return ResponseBody.TodoResponseBody(task=task_value)
    
    except Exception or HTTPException as error :
        response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
        return f"ERROR >>> {error}"
    




@router.post(
    '/api/todos/upload',
    status_code=status.HTTP_201_CREATED,
    summary="Upload picture",
    description="Upload a picture from completed task"
)
async def upload(response:Response , task_id:int , image:UploadFile = File(...)):
    DataBase.cursor.execute(
        f"SELECT * FROM todos WHERE id = {task_id}"
    )
    task = DataBase.cursor.fetchone()


    # Saving file
    unique_filename = f"file_{os.urandom(16).hex()}"
    with open(f"./ASSETS/Todos/{unique_filename}.{list(image.content_type.split('/'))[1]}" , "wb") as buffer :
        content = await image.read()
        buffer.write(content)

    if task != None:
        try:
            DataBase.cursor.execute(
                f"UPDATE todos SET completed = true , image_url = '/ASSETS/Todos/{unique_filename}.{list(image.content_type.split('/'))[1]}' WHERE id = {task_id}"
            )
            DataBase.connection.commit()


            DataBase.cursor.execute(
                f"SELECT * FROM todos WHERE id = {task_id}"
            )
            updated_task = DataBase.cursor.fetchone()

            # Log
            LogSystem.TodoLog.on_todo_update(id=task_id)

            # Return
            return ResponseBody.TodoResponseBody(task=updated_task)
        
        
        
        except Exception or HTTPException as error:
            response.status_code=status.HTTP_500_INTERNAL_SERVER_ERROR
            return f"ERROR >>> {error}"
        
    else:
        response.status_code=status.HTTP_404_NOT_FOUND
        return "Task Not Found !"
    



@router.delete(
    '/api/todos',
    status_code=status.HTTP_200_OK,
    summary="Delete a todo",
    description="Delete a todo from database by id"
)
def delete_todo(task_id:int , response:Response):
    # fetch todo
    DataBase.cursor.execute(
        f"SELECT * FROM todos WHERE id = '{task_id}'"
    )
    todo = DataBase.cursor.fetchone()

    if todo != None:
        try:
            # Delete task
            DataBase.cursor.execute(
                f"DELETE FROM todos WHERE id = '{task_id}'"
            )
            DataBase.connection.commit()

            # Log
            LogSystem.TodoLog.on_todo_remove(id=task_id)

            # Return
            return "Todo Deleted Successfully !"


        except Exception or HTTPException as error:
            response.status_code = status.WS_1011_INTERNAL_ERROR
            return f"ERROR >>> {error}"
         
    else:
        response.status_code = status.HTTP_404_NOT_FOUND
        return "Task Not Found !"
    



