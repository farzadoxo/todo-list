from pydantic import BaseModel
from typing import Optional



class NewTask(BaseModel):
    """this request body use for make a task or todo of a template 
    template : title = required  ------   completed = required  -------   dueDate = optional 
               string                       bool                           string or null"""
    
    title : str
    completed : bool = False
    dueDate : Optional[str] = None




class Upload(BaseModel):
    """This request body use for upload a picture from completed task
    template : task_id = required  ------   image = required
                 string                       Image"""
    
    task_id : str
    image : str



# class ResMod(BaseModel):
#     id : int
#     title : str
#     completed : bool = False
#     dueDate : Optional[str] = None




class UpdateTask(BaseModel):
    """This request body use for deleting a task from database"""

    title : Optional[str] = None
    completed : Optional[bool] = None
    dueDate : Optional[str] = None



class SignUp(BaseModel):
    """This request body use for signup to service"""

    full_name : str
    email : str 
    password : str



class Login(BaseModel):
    """This request body use for login to account"""

    email : str 
    password : str


class UpdateAccountInfo(BaseModel):
    """This request bosy use fot update or change account info"""
    
    full_name = Optional[str] = None
    email : Optional[str] = None
    password : Optional[str] = None

