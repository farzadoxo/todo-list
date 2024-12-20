# API Endpoints Docs
________________________________
# Signup
Signup a user
### Endpoint Details :
`POST /api/register`
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
`POST /api/login`
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
`PATCH /api/account/{email}`
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
`PATCH /api/profile/{email}?image=BINERY-FILE`
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

# Delete Account
Delete account
### Endpoint Details :
`DELETE /api/account/{email}`
### Response
`200 OK`
```json
Account Successfully Deleted!
```


# Get todos
Fetch all todos from database and show
### Endpoint Details :
`GET /api/todos/{email}`
### Response
`200 OK`
```json
{
  "todos" :[
  {
    // Json
  },
  {
    // Json
  }
  ]
}
```


# New Todo
Create a todo and save to database
### Endpoint Details :
`POST /api/todos`
### Request
```json
{
  "owner" : "STRING" ,
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
  "owner" : "joe@gmail.com" ,
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
`POST /api/upload/{task_id}?image=BINERY-FILE`
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

# Update Todo
Update todo info like title , priority , data and etc ...
### Endpoint Details :
`PATCH /api/todos/{task_id}`
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


# Delete Todo
Delete a todo
### Endpoint Details :
`DELETE /api/todos/{task_id}`
### Response
`204 NO CONTENT`
```json
Task Successfully Deleted!
```


# Search Todo
Find a Todo
### Endpoint Details :
`GET /api/search/{task_id}`
### Response
`Found 302`
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

