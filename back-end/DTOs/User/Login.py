from pydantic import BaseModel , Field
from typing import Optional



class Login(BaseModel):
    """This request body use for login to account"""

    email : str
    password : str