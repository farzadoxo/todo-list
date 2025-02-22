from pydantic import BaseModel , Field
from typing import Optional



class DeleteAccount(BaseModel):
    """This request body use for delete account and user todos"""

    password : str