from pydantic import BaseModel , Field
from typing import Optional



class UpdateAccountInfo(BaseModel):
    """This request body use for update or change account info"""
    
    new_email : Optional[str] = None
    new_password : Optional[str] = None