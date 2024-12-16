# API Endpoints Docs
________________________________
# Signup
Signup a user
### Endpoint Details :
`POST /api/account/signup`
### Request
```json
{
  "full_name" : "STRING",
  "email" : "STRING" ,
  "password" : "STRING"
}
```
### Response
```201 CREATED```
```json
{
  "full_name" : "John Watson",
  "email" : "test@yahoo.com" ,
  "password" : "1254avfdf" ,
  "avatar_url" : null
}
```


# Login
Login to account
### Endpoint Details :
`GET /api/account/login`
### Request
`200 OK`
```json
{
  "email" : "STRING" ,
  "password" : "STRING"
}
```
### Response
```json
{
  "full_name" : "John Watson",
  "email" : "test@yahoo.com" ,
  "password" : "1254avfdf" ,
  "avatar_url" : "/ASSETS/Profiles/..."
}
```


# Edit Account Info
Change or update Account Info
### Endpoint Details :
`PATCH /api/account/edit?email=STRING`
### Request
```json
OPTIONAL
{
  "new_email" : "STRING" ,
  "new_password" : "STRING"
}
```
### Response
`200 OK`
```json
{
  "full_name" : "John Watson",
  "email" : "test@yahoo.com" ,
  "password" : "1254avfdf" ,
  "avatar_url" : "/ASSETS/Profiles/..."
}
```


# Edit Profile Info
Change or update profile info
### Endpoint Details :
`PATCH /api/profile/edit?new_full_name=STRING&image=BINERY_IMAGE_FiLE`
### Response
`200 OK`
```json
{
  "full_name" : "John Watson",
  "email" : "test@yahoo.com" ,
  "password" : "1254avfdf" ,
  "avatar_url" : "/ASSETS/Profiles/..."
}
```


# Get todos
Fetch all todos from database and show
### Endpoint Details :
`GET /api/todos`
### Response
`200 OK`
```json
{
  "todos" : {
    "List of Todos"
  }
}
```


# New Todo
Create a todo and save to database
### Endpoint Details :
`POST /api/todos`
### Request
```json
{
  "title" : "STRING",
  "completed" : BOOLEAN ,
  "dueDate" : "STRING" OR NULL ,
  "priority" : "STRING" OR NULL
}
```
### Response
`201 CREATED`
```json
{
  "id" : 231648979789565 ,
  "title" : "Order Food",
  "completed" : true ,
  "dueDate" : "2024/01/02" ,
  "priority" : "LOW-MEDIUM-HIGH" ,
  "image_url" : null
}
```


# Upload
Upload a image for completed task
### Endpoint Details :
`POST /api/todos/upload?task_id=INT&image=Binery_File`
### Response
`200 OK`
```json
{
  "id" : 231648979789565 ,
  "title" : "Order Food",
  "completed" : true ,
  "dueDate" : "2024/01/02" ,
  "priority" : "LOW-MEDIUM-HIGH" ,
  "image_url" : "url of uploaded image"
  }
```