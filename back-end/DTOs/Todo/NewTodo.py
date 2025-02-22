from pydantic import BaseModel , Field
from typing import Optional



class NewTodo(BaseModel):
    """this request body use for make a task or todo of a template"""
    
    title : str
    completed : bool = False
    dueDate : Optional[str] = None
    priority : Optional[str] = None