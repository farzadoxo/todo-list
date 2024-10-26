from API.api import router
import datetime
from fastapi import FastAPI 

# api instanse
Api = FastAPI()
Api.include_router(router)


# ----------- EVENTS ------------
@Api.on_event("startup")
def startup_log():
    with open('back-end/API/API.log' ,mode='a' , encoding='utf-8') as log_file:
        log_file.write(f"🟢 Server start At : {datetime.datetime.now()} \n")


@Api.on_event("shutdown")
def shutdown_log():
    with open('back-end/API/API.log' ,mode='a' , encoding='utf-8') as log_file:
        log_file.write(f"🔴 Server shutdowned At : {datetime.datetime.now()} \n")