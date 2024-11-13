from API.bodyrequests import NewTaskReqBody, UpdateTaskReqBody, UploadReqBody , ResMod
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


@router.post('/main/sign_up',
             status_code=status.HTTP_201_CREATED,
             description="User successfully signed up !")
def sign_up(email:str,password:str):

    DataBase.cursor.execute(f"SELECT email FROM users WHERE email = {email}")
    user = DataBase.cursor.fetchone()
    if user != None:
        return "This email is used before !!"
    else:
        if len(password) < 8 or password.isalnum or password.isalpha:
            return "Invalid password template !! >>> Password most be 8  charecter and maked from numbers , special char and alphabet !"
        else:
            DataBase.cursor.execute("INSERT INTO users (?,?)",
                                    (email,password))
            DataBase.connection.commit()
            return "User signed Up ! :)"
        



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

    

@router.patch("/api/todos/{id}", status_code=status.HTTP_200_OK)
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
                f"UPDATE todos SET title = {reqbody.title} WHERE id = {id}"
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



@router.delete("/api/todos/{id}", status_code=status.HTTP_200_OK)
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



@router.get("/api/todos/find/{id}")
def find_task(id: int):
    # Query in database
    try:
        DataBase.cursor.execute(f"SELECT * FROM todos WHERE id = {id}")
        task = DataBase.cursor.fetchone()
    except Exception or HTTPException as error:
        return f"ERROR : >>> {error}"

    # Make responive json model
    response_model = {
        "id": id,
        "title": task[1],
        "completed": task[2],
        "dueDate": task[3],
    }

    return response_model
