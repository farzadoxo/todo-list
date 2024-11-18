from API.requestbody import (NewTask, UpdateTask, Upload , SignUp , Login , UpdateAccountInfo)
from DATABASE.Db import DataBase
from random import randint
from fastapi import status, HTTPException, APIRouter , Response
from fastapi.responses import JSONResponse

# router instanse
router = APIRouter()



class IDGenerator:
    def generate_id():
        id = randint(1000034456, 9564564347821289237)

        DataBase.cursor.execute(
            "SELECT id from todos"
        )
        active_ids = DataBase.cursor.fetchall()

        for id_countaner in active_ids:
            if id_countaner == id:
                id = randint(1000034456, 9564564347821289237)
                return id
            else:
                return id


# ----------------------     USER SECTION      ---------------------


@router.post('/api/account/signup',
             status_code=status.HTTP_201_CREATED,
             description="Create account to service")
def signup(reqbody : SignUp , response : Response):

    DataBase.cursor.execute(f"SELECT email FROM users WHERE email = '{reqbody.email}'")
    user = DataBase.cursor.fetchone()

    if user != None:
        response.status_code = status.HTTP_409_CONFLICT
        return "This email is used before !!"
    else:
        try:
            if len(reqbody.password) < 8:
                response.status_code = status.HTTP_400_BAD_REQUEST
                return "Invalid password template !! >>> Password most be 8  charecter and maked from numbers , special char and alphabet !"
            else:
                DataBase.cursor.execute("INSERT INTO users VALUES (?,?,?)",
                                        (reqbody.full_name,reqbody.email,reqbody.password))
                DataBase.connection.commit()

                return reqbody
            
        except Exception or HTTPException as error:
            response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
            return f"ERROR >>> {error}"



@router.get(
        '/api/account/login',
        status_code=status.HTTP_200_OK,
        description="Login to user account"
)
def login(reqbody:Login , response:Response):
    DataBase.cursor.execute(
        f"SELECT * FROM users WHERE email = '{reqbody.email}'"
    )
    user = DataBase.cursor.fetchone()
    
    if user != None :
        if reqbody.email == user[1] and reqbody.password == user[2]:
            return f"Dear '{user[0]}' Welcome to Todo App :) \n {reqbody}"
        else:
            response.status_code = status.HTTP_400_BAD_REQUEST
            return "Password is invalid ! :("
    else:
        response.status_code = status.HTTP_404_NOT_FOUND
        return "User not found :( "
    




@router.patch(
        '/api/account/edit',
        status_code=status.HTTP_200_OK,
        description="Edit account Info")
def update_info(reqbody : UpdateAccountInfo , current_email : str , response : Response):
    DataBase.cursor.execute(f"SELECT * FROM users WHERE email = '{current_email}'")
    current_user = DataBase.cursor.fetchone()

    try:

        if reqbody.full_name != None and reqbody.full_name != current_user[0]:
            DataBase.cursor.execute(f"UPDATE users SET full_name = '{reqbody.full_name}' WHERE email = '{current_email}'")
            DataBase.connection.commit()

        elif reqbody.email != None and reqbody.email != current_user[1]:
            DataBase.cursor.execute(f"UPDATE users SET email = '{reqbody.email}' WHERE email = '{current_email}'")
            DataBase.connection.commit()

        elif reqbody.password != None and reqbody.password != current_user[2]:
            DataBase.cursor.execute(f"UPDATE users SET password = '{reqbody.password}' WHERE email = '{current_email}'")
            DataBase.connection.commit()

        return reqbody

    except Exception or HTTPException as error:
        response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
        return f"ERROR >>> {error}"


# --------------------       TASK SECTION         ----------------------

@router.get("/api/todos", status_code=status.HTTP_200_OK)
def all_todos(response:Response):
    # fetch todos from database
    DataBase.cursor.execute("SELECT * FROM todos")
    items = DataBase.cursor.fetchall()

    if items != None :
        return JSONResponse(content={"todos" : items})
    else :
        response.status_code = status.WS_1011_INTERNAL_ERROR
        return "You dont have any tasks"



@router.post(
    "/api/todos",
    description="Task successfully created (added)",
    status_code=status.HTTP_201_CREATED
)
def new_task(reqbody: NewTask , response:Response):
    response_body = {
        "id": IDGenerator.generate_id(),  
        "title": reqbody.title,
        "completed": reqbody.completed,
        "dueDate": reqbody.dueDate
    }

    try:
        DataBase.cursor.execute(
            "INSERT INTO todos VALUES (?,?,?,?)",
            (response_body["id"], reqbody.title, reqbody.completed, reqbody.dueDate)
        )
        DataBase.connection.commit()

        return response_body
    
    except HTTPException as error:
        response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
        return f"Can't Create new task !!! \n {error}"


    

    # try:
    #     with open("back-end/__tests__/todos.json",'a') as file:
    #         json([{
    #             "id" : randint(1000034456,4564564563453525648734234234),
    #             "title" : reqbody.title ,
    #             "completed" : reqbody.completed ,
    #             "dueDate" : reqbody.dueDate}] , file)
    # except HTTPException as error :
    #     print(error)



@router.post(
    "/api/upload",
    status_code=status.HTTP_201_CREATED,
    description="Task was successfully completed"
)
def upload(reqbody: Upload , response:Response):

    DataBase.cursor.execute(
        f"SELECT * FROM todos WHERE id = {reqbody.task_id}"
    )
    task = DataBase.cursor.fetchone()

    # --------------Update completed field to true---------------
    if task != None:
        DataBase.cursor.execute(
            f"UPDATE todos SET completed = true WHERE id = {reqbody.task_id}"
        )
        DataBase.connection.commit()

        return reqbody
    
    else:
        response.status_code = status.HTTP_404_NOT_FOUND
        return "Task Not Found !"

    

@router.patch("/api/todos", status_code=status.HTTP_200_OK)
def update_task(reqbody: UpdateTask, id: int , response:Response):

    response_body = {
        "id" : id,
        "title" : reqbody.title,
        "completed" : reqbody.completed,
        "dueDate" : reqbody.dueDate
    }
    
    try:
        DataBase.cursor.execute(f"SELECT * FROM todos WHERE id = {id}")
        task = DataBase.cursor.fetchone()

        if task != None:
            # Update task :
            if reqbody.title != None and reqbody.title != task[1]:
                DataBase.cursor.execute(
                    f"UPDATE todos SET title = '{reqbody.title}' WHERE id = {id}"
                )
                DataBase.connection.commit()

            elif reqbody.completed != None:
                DataBase.cursor.execute(
                    f"UPDATE todos SET completed = {reqbody.completed} WHERE id = {id}"
                )
                DataBase.connection.commit()

            elif reqbody.dueDate != None and reqbody.dueDate != task[3]:
                DataBase.cursor.execute(
                    f"UPDATE todos SET dueDate = '{reqbody.dueDate}' WHERE id = {id}"
                )
                DataBase.connection.commit()
            
            return response_body
        
        else:
            response.status_code = status.HTTP_404_NOT_FOUND
            return "Task not found"

    except HTTPException or Exception as error:
        response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
        return f"ERROR : >>> {error}"



@router.delete("/api/todos", status_code=status.HTTP_200_OK)
def delete_task(id: int , response:Response):

    try:
        # Fetch task from database
        DataBase.cursor.execute(f"SELECT * FROM todos WHERE id = {id}")
        task = DataBase.cursor.fetchone()

        if task != None:
            response_body = {
            "id" : id,
            "title" : task[1],
            "completed" : task[2],
            "dueDate" : task[3]
            }

            DataBase.cursor.execute(f"DELETE FROM todos WHERE id = {id}")
            DataBase.connection.commit()

            return response_body
        
        else:
            response.status_code = status.HTTP_404_NOT_FOUND
            return "Task Not Found !"
    
    except Exception as error:
        response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
        return f"ERROR : >>> {error}"



@router.get("/api/todos/search")
def search_task(id: int , response:Response):
    
    try:
        # Query in database
        DataBase.cursor.execute(f"SELECT * FROM todos WHERE id = {id}")
        task = DataBase.cursor.fetchone()

        # Make responive json model
        response_model = {
            "id": id,
            "title": task[1],
            "completed": task[2],
            "dueDate": task[3]
        }
        
        if task != None:

            return response_model
        
        else :
            response.status_code = status.HTTP_404_NOT_FOUND
            return "Task not found"
    
    except Exception or HTTPException as error:
        response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
        return f"ERROR : >>> {error}"
    