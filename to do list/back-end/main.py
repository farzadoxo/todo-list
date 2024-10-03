from fastapi import FastAPI

api = FastAPI()

@api.get('/test')
def hello():
    return "fool"


class ToDoList:
    """  Create a task , when its complete take a picture or video 
         from completed task  """


    def __init__(self,owner_name:str ="User"):
        self.todo_list_owner_name = owner_name



    def add_task(self , task:str):
        if task != "":
            todo_page = open(f"{self.todo_list_owner_name}.txt",mode='a')
            todo_page.writelines(f"{task} \n")



#test
my_todo = ToDoList(owner_name="ali")
my_todo.add_task(task="fuck sara")