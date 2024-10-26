# Manual for BackEnd
<h3>Installing Package</h3>

Use `requirements.txt` for install module and libraries or use following command :

`pip install fastapi[standard]`

(All libraries are installed by use this command)

installed modules and libraries : ***`fastapi - uvicorn - pydantic - typing - jinja2`***

<h3>DataBase</h3>

api use **sqlite** DBMS and data will be saved in database.db
API database have one table and the table name is `todos` 
todos table have 4 column :

| Name | Type |
| -------- | ------- |
| `id` | `INTEGER` |
| `title`  | `STRING` |
| `completed` | `BOOLEAN` |
| `dueDate` | `STRING-NULL` |

# How to run server/API
1. Install package and libraries 
2. Create database file and make table
3. Run `main.py` file
<h3>Use API</h3>
For send request to api use a browser or app for work with api (postman or somthing else)
<h4>Body reqyests</h4>
New todo :

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

<h4>API URL and Methods :</h4>

Show All Tasks : GET >> `/api/todos` 

New Task : POST >>`/api/todos`

Upload Pic : POST >> `/api/upload`

Update Task : PATCH >> `/api/todos/{id}`
