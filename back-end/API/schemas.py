from pydantic import BaseModel , Field
from typing import Optional



class NewTodo(BaseModel):
    """this request body use for make a task or todo of a template"""
    
    owner : str
    title : str
    completed : bool = False
    dueDate : Optional[str] = None
    priority : Optional[str] = None




# class ResMod(BaseModel):
#     id : int
#     title : str
#     completed : bool = False
#     dueDate : Optional[str] = None




class UpdateTodo(BaseModel):
    """This request body use for deleting a task from database"""

    title : Optional[str] = None
    completed : Optional[bool] = None
    dueDate : Optional[str] = None
    priority : Optional[str] = None



class SignUp(BaseModel):
    """This request body use for signup to service"""
    
    full_name : str
    email : str = Field(min_length=10)
    password : str



class Login(BaseModel):
    """This request body use for login to account"""

    email : str
    password : str



class UpdateAccountInfo(BaseModel):
    """This request body use for update or change account info"""
    
    new_email : Optional[str] = None
    new_password : Optional[str] = None


class UpdateProfileInfo(BaseModel):
    """This request body use for update or change profile info """

    new_full_name: Optional[str] = None


class DeleteAccount(BaseModel):
    """This request body use for delete account and user todos"""

    password : str