<h3>Installing Package</h3>

Use `requirements.txt` for install module and libraries or use following command :

`pip install fastapi[standard]`

(All libraries are installed by use this command)

installed modules and libraries : ***`fastapi - uvicorn - pydantic - typing - jinja2`***

<h3>DataBase</h3>

api use **sqlite** DBMS and data will be saved in database.db
API database have one table and the table name is `todos` and `users`

todos table have 4 coloumn :

| Name | Type |
| -------- | ------- |
| `id` | `INTEGER` |
| `title`  | `STRING` |
| `completed` | `BOOLEAN` |
| `dueDate` | `STRING-NULL` |

users have 3 coloumn :

| Name | Type |
| -------- | ------- |
| `full_name` | `STRING` |
| `email`  | `STRING` |
| `password` | `STRING` |

# How to run server/API
1. Install package and libraries 
2. Create database file and make table
3. Run `main.py` file
<h3>Use API</h3>
For send request to api use a browser or app for work with api (postman or somthing else)
<h4>Body reqyests</h4>
New Task :

```json
{
    "title" : "somthing",
    "completed" : "false",
    "dueDate" : "null or data(string)"
}
```

Complete a Task :

```json
{
    "id" : 123456,
    "Image" : Path or URL
}
```

Update a task :

```json
{
    "title" : OPTIONAL,
    "completed" : OPTIONAL,
    "dueDate" : OPTIONAL
}
```

Signup User :
```json
{
    "full_name" : "Albert mandela" ,
    "email"  : "albert.m@gmail.com" ,
    "password" : "12345678ab"
}
```

Login :
```json
{
    "email" : "albert.m@gmail.com" ,
    "password" : "12345678ab"
}
```

Edit account info :
```json
{
    "full_name" : OPTIONAL ,
    "email" : OPTIONAL ,
    "password" : OPTIONAL
}
```


<h4>API URL and Methods :</h4>
<h5> Task endpoints : <h5>

> Show All Tasks : GET >> `/api/todos` 

> New Task : POST >>`/api/todos`

> Upload Pic : POST >> `/api/upload`

> Update Task : PATCH >> `/api/todos?={id}`

> Delete Task : DELETE >> `/api/todos?={id}`

> Find Task : GET >> `api/todos/find?={id}`

<h5> User endpoints : <h5>

> Signup : POST >> `/api/account/signup`

> Login : GET >> `/api/account/login`

> Update Account Info : PATCH >> `api/account/edit`
