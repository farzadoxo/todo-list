from pydantic import BaseModel , Field
from typing import Optional



class UpdateTodo(BaseModel):
    """This request body use for deleting a task from database"""

    title : Optional[str] = None
    completed : Optional[bool] = None
    dueDate : Optional[str] = None
    priority : Optional[str] = None