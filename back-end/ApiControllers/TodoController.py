from DTOs.Todo import (NewTodo,UpdateTodo)
from Extentions.ResponseExtention import ResponseBody
from Extentions.LogExtention import LogSystem
from Extentions.GuidExtention import GuidGenerator
from DATABASE.Db import DataBase
from fastapi import (status, HTTPException, APIRouter, Response , File , UploadFile)
import os
import jwt

# router instanse
router = APIRouter()


@router.get(
    '/api/todos/{email}',
    status_code= status.HTTP_200_OK,
    summary="Show all user todos",
    description="Fetch All user todos from database and show it",
    response_model=None
)
def get_todos(email:str , response:Response):
    try:
        # Make a query and Fetch todos from database
        DataBase.cursor.execute(
            f"SELECT * FROM todos WHERE owner = '{jwt.encode({'owner':email},'secret',algorithm='HS256')}'"
        )
        todos = DataBase.cursor.fetchall()

        # Return todos
        return ResponseBody.AllTodoResponseBody(todos=todos)
    
    except Exception or HTTPException as error:
        response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
        return f"ERROR >>> {error}"
    



@router.post(
    '/api/todos/{email}',
    status_code= status.HTTP_201_CREATED,
    summary="Create new todo",
    description="Create a new task and save it on database",
    response_model=None
)
def new_todo(reqbody:NewTodo.NewTodo ,email:str, response:Response): 
    try:
        id = GuidGenerator.generate_guid()
        task_value = (id , jwt.encode({'owner':email.lower()},'secret',algorithm='HS256') ,
                      reqbody.title , reqbody.completed ,
                      reqbody.dueDate , reqbody.priority , None)
        DataBase.cursor.execute(
            f"INSERT INTO todos VALUES (?,?,?,?,?,?,?)", task_value
        )
        DataBase.connection.commit()
        

        # Log 
        LogSystem.TodoLog.on_todo_create(id=id)

        return ResponseBody.TodoResponseBody(task=task_value)
    
    except Exception or HTTPException as error :
        response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
        return f"ERROR >>> {error}"
    




@router.post(
    '/api/upload/{task_id}',
    status_code=status.HTTP_200_OK,
    summary="Upload picture",
    description="Upload a picture from completed task",
    response_model=None
)
async def upload(response:Response , task_id:int , image:UploadFile = File(...)):
    DataBase.cursor.execute(
        f"SELECT * FROM todos WHERE id = {task_id}"
    )
    task = DataBase.cursor.fetchone()


    if task != None:
        try:
            # Saving file
            unique_filename = f"file_{os.urandom(16).hex()}"
            with open(f"./ASSETS/Todos/{unique_filename}.{list(image.content_type.split('/'))[1]}" , "wb") as buffer :
                content = await image.read()
                buffer.write(content)

            # Save to database
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
    '/api/todos/{task_id}',
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Delete a todo",
    description="Delete a todo from database by id",
    response_model=None
)
def delete_todo(task_id:int , response:Response):
    # fetch todo
    DataBase.cursor.execute(
        f"SELECT * FROM todos WHERE id = '{task_id}'"
    )
    task = DataBase.cursor.fetchone()

    if task != None:
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
    




@router.patch(
    '/api/todos/{task_id}',
    status_code=status.HTTP_200_OK,
    summary="Update todo",
    description="Change or update task info like : title-priority-dueDate and etc ...",
    response_model=None
)
def update_todo(reqbody:UpdateTodo.UpdateTodo , task_id:int , response:Response):
    # fetch task from database
    DataBase.cursor.execute(
        f"SELECT * FROM todos WHERE id = {task_id}"
    )
    task = DataBase.cursor.fetchone()

    if task != None:

        try:
            # Update Title
            if reqbody.title != None:  
                DataBase.cursor.execute(
                    f"UPDATE todos SET title = '{reqbody.title}' WHERE id = {task_id}"
                )
                DataBase.connection.commit()
                
            
            # Update Completed
            if reqbody.completed != None:
                DataBase.cursor.execute(
                    f"UPDATE todos SET completed = {reqbody.completed} WHERE id = {task_id}"
                )
                DataBase.connection.commit()
                
                
            # Update dueDate
            if reqbody.dueDate != None:
                DataBase.cursor.execute(
                    f"UPDATE todos SET dueDate = '{reqbody.dueDate}' WHERE id = {task_id}"
                )
                DataBase.connection.commit()
                
            
            # Update Priority
            if reqbody.priority != None:
                DataBase.cursor.execute(
                    f"UPDATE todos SET priority = '{reqbody.priority}' WHERE id = {task_id}"
                )
                DataBase.connection.commit()
        
        except Exception or HTTPException as error:
            response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
            return f"ERROR >>> {error}"
            

        DataBase.cursor.execute(
            f"SELECT * FROM todos WHERE id = {task_id}"
        )
        updated_task = DataBase.cursor.fetchone()

        # Log
        LogSystem.TodoLog.on_todo_update(id=task_id)

        # Return
        return ResponseBody.TodoResponseBody(task=updated_task)
        
    
    else:
        response.status_code = status.HTTP_404_NOT_FOUND
        return "Task Not Found !"
        





@router.get(
    '/api/search/{task_id}',
    status_code= status.HTTP_302_FOUND,
    summary="Search Task",
    description="Search todo in database using id",
    response_model=None
)
def search_todo(task_id:int , response:Response):
    # Make a query to find todo in database
    DataBase.cursor.execute(
        f"SELECT * FROM todos WHERE id = {task_id}"
    )
    todo = DataBase.cursor.fetchone()

    if todo != None:
        # Return
        return ResponseBody.TodoResponseBody(task=todo)
     
    else:
        response.status_code = status.HTTP_404_NOT_FOUND
        return "Task Not Found !"