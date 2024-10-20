from pydantic import BaseModel
from typing import Optional
from datetime import date
from fastapi import Path , Query


class Task(BaseModel):
    # request body for task parameters

    id:int
    title:str = Path(min_length=2 , max_length=50)
    completed:bool = False
    dueDate:date = None




class ToDoList:
    """  Create a task , when its complete take a picture or video 
         from completed task  """


    def __init__(self,owner_name:str ="User"):
        self.todo_list_owner_name = owner_name



    def add_task(self , task:str):
        if task != "":
            todo_page = open(f"{self.todo_list_owner_name}.txt",mode='a')
            todo_page.writelines(f"{task} \n")

