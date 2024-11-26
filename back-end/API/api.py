from API.models import NewTask, UpdateTask, Upload, SignUp, Login, UpdateAccountInfo
from API.self_module import ResponseBody, IDGenerator
from DATABASE.Db import DataBase
from random import randint
from fastapi import status, HTTPException, APIRouter, Response
from fastapi.responses import JSONResponse


# router instanse
router = APIRouter()


