from pydantic import BaseModel ,Field
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
    
    fullname : str
    email : str 
    password : str = Field(min_length=8,max_length=60)





class Login(BaseModel):
    """This request body use for login to account"""

    email : str
    password : str



class UpdateAccountInfo(BaseModel):
    """This request bosy use fot update or change account info"""
    
    fullname : Optional[str]
    email : Optional[str]
    password : Optional[str]