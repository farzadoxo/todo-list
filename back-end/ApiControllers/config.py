import logging
from ApiControllers.UserController import router
from ApiControllers.TodoController import router
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from Extentions.LogExtention import LoggerSetup



# API instance
Api = FastAPI()
Api.include_router(router)


# cors serttings
Api.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)


# ----------- EVENTS ------------
@Api.on_event("startup")
def startup_log():
    LoggerSetup.server_logger.info("🟢 Server started")


@Api.on_event("shutdown")
def shutdown_log():
    LoggerSetup.server_logger.info("🔴 Server shutdown")
