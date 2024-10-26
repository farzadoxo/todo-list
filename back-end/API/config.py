from API.api import router
from fastapi import FastAPI 

# api instanse
Api = FastAPI()
Api.include_router(router)