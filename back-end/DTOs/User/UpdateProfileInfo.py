from pydantic import BaseModel , Field
from typing import Optional



class UpdateProfileInfo(BaseModel):
    """This request body use for update or change profile info """

    new_full_name: Optional[str] = None