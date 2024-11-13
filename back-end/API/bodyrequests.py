from pydantic import BaseModel
from typing import Optional



class NewTaskReqBody(BaseModel):
    """this request body use for make a task or todo of a template 
    template : title = required  ------   completed = required  -------   dueDate = optional 
               string                       bool                           string or null"""
    
    title : str
    completed : bool = False
    dueDate : Optional[str] = None




class UploadReqBody(BaseModel):
    """This request body use for upload a picture from completed task
    template : task_id = required  ------   image = required
                 string                       Image"""
    
    task_id : str
    image : str



class ResMod(BaseModel):
    id : int
    title : str
    completed : bool = False
    dueDate : Optional[str] = None




class UpdateTaskReqBody(BaseModel):
    """This request body use for deleting a task from database"""

    title : Optional[str] = None
    completed : Optional[bool] = None
    dueDate : Optional[str] = None

class SignUpReqBody(BaseModel):
    """This request body use for signup to service"""

    email : str 
    password : str
