from random import randint
from fastapi import FastAPI , status , HTTPException 
from pydantic import BaseModel
from typing import Optional
import sqlite3


# api instanse
api = FastAPI()




class NewTaskReqBody(BaseModel):
    """this request body use for make a task or todo of a template 
    template : title = required  ------   completed = required  -------   dueDate = optional 
               string                       bool                           string or null"""
    
    title : str
    completed : bool = False
    dueDate : Optional[str] = None




class TaskCompletedReqBody(BaseModel):
    """This request body use for upload a picture from completed task
    template : task_id = required  ------   image = required
                 string                       Image"""
    
    task_id : str
    image : str



class UpdateTaskReqBody(BaseModel):
    """This request body use for deleting a task from database"""

    title : Optional[str] = None
    completed : Optional[bool] = None
    dueDate : Optional[str] = None



# class ResMod(BaseModel):
#     id : int
#     title : str
#     completed : bool = False
#     dueDate : Optional[str] = None




class DataBase:
    """For use this class you should create a table called 'todos' 
    with coloumns : id-title-completed-dueDate
                    INTEGER-TEXT-BOOLEAN-TEXT
    or run this code :
    DataBase.cursor.execute("CREATE TABLE todos (id INTEGER , title TEXT , completed BOOLEAN , dueDate TEXT)")"""

    connection = sqlite3.connect("back-end/__tests__/database.db",check_same_thread=False)
    cursor = connection.cursor()





@api.get('/api/todos' , status_code=status.HTTP_200_OK)
def all_todos():
    # fetch todos from database
    DataBase.cursor.execute("SELECT * FROM todos")
    items = DataBase.cursor.fetchall()

    return {"todos" : items}





@api.post('/api/todos' , description="Task successfully created (added)" , status_code=status.HTTP_201_CREATED)
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




@api.post('/api/upload' , status_code=status.HTTP_201_CREATED , description= "Task was successfully completed")
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
        return "Task not found in database!!!"
        
    return reqbody





@api.patch('/api/todos/{id}' , status_code=status.HTTP_200_OK)
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
