from pydantic import BaseModel , Field
from typing import Optional



class Signup(BaseModel):
    """This request body use for signup to service"""
    
    full_name : str
    email : str = Field(min_length=10)
    password : str