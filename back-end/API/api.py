from API.bodyrequests import NewTaskReqBody, UpdateTaskReqBody, UploadReqBody , ResMod , SignUpReqBody , LoginReqBody
from DATABASE.Db import DataBase
from random import randint
from fastapi import status, HTTPException, APIRouter


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


@router.post('/api/signup',
             status_code=status.HTTP_201_CREATED,
             description="Create account to service")
def signup(reqbody : SignUpReqBody):

    DataBase.cursor.execute(f"SELECT email FROM users WHERE email = '{reqbody.email}'")
    user = DataBase.cursor.fetchone()
    if user != None:
        return "This email is used before !!"
    else:
        if len(reqbody.password) < 8:
            return "Invalid password template !! >>> Password most be 8  charecter and maked from numbers , special char and alphabet !"
        else:
            DataBase.cursor.execute("INSERT INTO users VALUES (?,?,?)",
                                    (reqbody.full_name,reqbody.email,reqbody.password))
            DataBase.connection.commit()
            return "User signed Up ! :)"



@router.get(
        '/api/login',
        status_code=status.HTTP_200_OK,
        description="Login to user account"
)
def login(reqbody : LoginReqBody):
    DataBase.cursor.execute(
        f"SELECT * FROM users WHERE email = '{reqbody.email}'"
    )
    user = DataBase.cursor.fetchone()

    if user != None :
        if reqbody.email == user[1] and reqbody.password == user[2]:
            return f"Dear '{user[0]}' Welcome to Todo App :)"
        else:
            return "Password is invalid ! :("
    else:
        return "User not found :( "



# --------------------       TASK SECTION         ----------------------

@router.get("/api/todos", status_code=status.HTTP_200_OK)
def all_todos():
    # fetch todos from database
    DataBase.cursor.execute("SELECT * FROM todos")
    items = DataBase.cursor.fetchall()

    return {"todos": items}



@router.post(
    "/api/todos",
    description="Task successfully created (added)",
    status_code=status.HTTP_201_CREATED
)
def new_task(reqbody: NewTaskReqBody):
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
def upload(reqbody: UploadReqBody):
    try:
        DataBase.cursor.execute(
            f"SELECT * FROM todos WHERE id = {reqbody.task_id}"
        )
        task = DataBase.cursor.fetchone()
    except HTTPException or Exception as error:
        return f"Can't fetch task from database \n {error}"
    # --------------Update completed field to true---------------
    if task != None:
        DataBase.cursor.execute(
            f"UPDATE todos SET completed = true WHERE id = {reqbody.task_id}"
        )
        DataBase.connection.commit()
        return reqbody
    else:
        return "Task Not Found !"

    

@router.patch("/api/todos/", status_code=status.HTTP_200_OK)
def update_task(reqbody: UpdateTaskReqBody, id: int):

    response_body = {
        "id" : id,
        "title" : reqbody.title,
        "completed" : reqbody.completed,
        "dueDate" : reqbody.dueDate
    }
    
    try:
        DataBase.cursor.execute(f"SELECT * FROM todos WHERE id = {id}")
        task = DataBase.cursor.fetchone()

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
                f"UPDATE todos SET dueDate = {reqbody.dueDate} WHERE id = {id}"
            )
            DataBase.connection.commit()
        
        return response_body

    except HTTPException or Exception as error:
        return f"ERROR : >>> {error}"



@router.delete("/api/todos/", status_code=status.HTTP_204_NO_CONTENT)
def delete_task(id: int):

    try:
        # Fetch task from database
        DataBase.cursor.execute(f"SELECT * FROM todos WHERE id = {id}")
        task = DataBase.cursor.fetchone()

        response_body = {
            "id" : id,
            "title" : task[1],
            "completed" : task[2],
            "dueDate" : task[3]
        }
    except Exception as error:
        return f"ERROR : >>> {error}"

    # Delete task :
    if task != None:
        DataBase.cursor.execute(f"DELETE FROM todos WHERE id = {id}")
        DataBase.connection.commit()
        return response_body
    else:
        return "Task Not Found !"



@router.get("/api/todos/")
def find_task(id: int):
    
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
        return response_model
    
    except Exception or HTTPException as error:
        return f"ERROR : >>> {error}"

    
    

    
