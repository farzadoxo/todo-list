from API.bodyrequests import NewTaskReqBody , UpdateTaskReqBody , TaskCompletedReqBody
from DATABASE.Db import DataBase
from random import randint
from fastapi import  status , HTTPException , APIRouter


#router instanse
router = APIRouter()


@router.get('/api/todos' , status_code=status.HTTP_200_OK)
def all_todos():
    # fetch todos from database
    DataBase.cursor.execute("SELECT * FROM todos")
    items = DataBase.cursor.fetchall()

    return {"todos" : items}





@router.post('/api/todos' , description="Task successfully created (added)" , status_code=status.HTTP_201_CREATED)
def new_task(reqbody:NewTaskReqBody):
    response_body = {
        "id" : randint(1000034456,9564564347821289237),
        "title" : reqbody.title,
        "completed" : reqbody.completed,
        "dueDate" : reqbody.dueDate
    }

    try:
        DataBase.cursor.execute(f"INSERT INTO todos VALUES (?,?,?,?)",
                                (response_body["id"],reqbody.title,reqbody.completed,reqbody.dueDate))
        DataBase.connection.commit()
        return response_body
    except HTTPException as error :
        print(error)


    # try:
    #     with open("back-end/__tests__/todos.json",'a') as file:
    #         json([{
    #             "id" : randint(1000034456,4564564563453525648734234234),
    #             "title" : reqbody.title ,
    #             "completed" : reqbody.completed ,
    #             "dueDate" : reqbody.dueDate}] , file)
    # except HTTPException as error :
    #     print(error)




@router.post('/api/upload' , status_code=status.HTTP_201_CREATED , description= "Task was successfully completed")
def task_completed(reqbody:TaskCompletedReqBody):
    try:
        DataBase.cursor.execute(f"SELECT * FROM todos WHERE id = {reqbody.task_id}")
        task = DataBase.cursor.fetchone()
    except HTTPException or Exception as error:
        print(error)
    # --------------Update completed field to true---------------
    if task != None:
        DataBase.cursor.execute(f"UPDATE todos SET completed = true WHERE id = {reqbody.task_id}")
        DataBase.connection.commit()
    else :
        return "Task Not Found !"
        
    return reqbody





@router.patch('/api/todos/{id}' , status_code=status.HTTP_200_OK)
def update_task(reqbody:UpdateTaskReqBody , id:int):

    try:
        DataBase.cursor.execute(f"SELECT * FROM todos WHERE id = {id}")
        task = DataBase.cursor.fetchone()
        # Update task :
        if reqbody.title != None and reqbody.title != task[1]:
            DataBase.cursor.execute(f"UPDATE todos SET title = {reqbody.title} WHERE id = {id}")
            DataBase.connection.commit()
        elif reqbody.completed != None :
            DataBase.cursor.execute(f"UPDATE todos SET completed = {reqbody.completed} WHERE id = {id}")
            DataBase.connection.commit()
        elif reqbody.dueDate != None and reqbody.dueDate != task[3]:
            DataBase.cursor.execute(f"UPDATE todos SET dueDate = {reqbody.dueDate} WHERE id = {id}")
            DataBase.connection.commit()
    except HTTPException as httperror :
        print(httperror)





@router.delete('/api/todos/{id}' , status_code=status.HTTP_200_OK)
def delete_task(id:int):
    # Fetch task from database
    DataBase.cursor.execute(f"SELECT * FROM todos WHERE id = {id}")
    task = DataBase.cursor.fetchone()

    # Delete task :
    if task != None:
        DataBase.cursor.execute(f"DELETE FROM todos WHERE id = {id}")
        DataBase.connection.commit()
        return "Task was successfully deleted from Database"
    else:
        return "Task Not Found !" 
    




@router.get('/api/todos/find/{id}')
def find_task(id:int):

    # Query in database
    try:
        DataBase.cursor.execute(f"SELECT * FROM todos WHERE id = {id}")
        task = DataBase.cursor.fetchone()
    except Exception or HTTPException as error:
        print(error)

    # Make responive json model
    response_model = {
        "id": task[0],
        "title" : task[1],
        "completed" : task[2],
        "dueDate" : task[3]
    }

    return response_model