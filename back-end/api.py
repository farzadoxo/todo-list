from random import randint
from fastapi import FastAPI , Path , Query , status , HTTPException
from pydantic import BaseModel
from typing import Optional
import sqlite3
import json


# api contribute
api = FastAPI()


class ReqBody(BaseModel):
    """this request body use for make a task or todo of a template 
    template : title = required  ------   completed = required  -------   dueDate = optional 
               string                       bool                           string or null"""
    
    title : str
    completed : bool = False
    dueDate : Optional[str] = None

class DataBase:
    connection = sqlite3.connect("back-end/__tests__/database.db",check_same_thread=False)
    cursor = connection.cursor()


@api.get('/api/alltodos' , status_code=status.HTTP_200_OK)
def all_todos():
    ...



@api.post('/api/todos'  , description="Task was successfully created (added)")
def new_task(reqbody:ReqBody):
    print(reqbody)
    try:
        DataBase.cursor.execute(f"INSERT INTO todos VALUES (?,?,?,?)",
                                (randint(1000034456,9564564347821289237),reqbody.title,reqbody.completed,reqbody.dueDate))
        DataBase.connection.commit()
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