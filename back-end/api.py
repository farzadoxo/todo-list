from main import Task
from fastapi import FastAPI

api = FastAPI()


@api.get('')
async def getAllTodos():
    ...


@api.get('')
async def newTodo():
    ...