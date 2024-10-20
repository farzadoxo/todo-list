from main import Task
from fastapi import FastAPI , Path , Query , status , HTTPException
from pydantic import BaseModel
from typing import Optional
import json


# api contribute
api = FastAPI()


class ReqBody(BaseModel):
    title : str
    completed : bool = False
    dueDate : Optional[str] = None



@api.get('/api/alltodos' , status_code=status.HTTP_200_OK)
def all_todos():
    ...



@api.post('/api/todos' , response_model=ReqBody , description="Task was successfully created (added)")
def new_task(reqbody:ReqBody):
    try:
        with open("back-end/tests/todos.json",'a') as file:
            json.dump(reqbody , file)
    except HTTPException as error :
        print(error)