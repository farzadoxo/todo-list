# API
# Signup

Signup a user

### Endpoint Details :

`POST /api/account/signup`

### Request

```json
{
  "full_name" : "John Watson",
  "email" : "test@yahoo.com" ,
  "password" : "1254avfdf"
}
```

### Response
```201 CREATED```
```json
{
  "full_name" : "John Watson",
  "email" : "test@yahoo.com" ,
  "password" : "1254avfdf"
}
```


# Login

Login to account

### Endpoint Details :

`GET /api/account/login`

### Request

```json
{
  "email" : "test@yahoo.com" ,
  "password" : "1254avfdf"
}
```

### Response
```200 OK```
```json
{
  "email" : "test@yahoo.com" ,
  "password" : "1254avfdf"
}
```

# Edit Account Info
Change or update Account Info

### Request
```json
{
  "email" : OPTIONAL ,
  "password" : OPTIONAL
}
```
### Response
`201 CREATED`
```json
{
  "full_name" : "John Watson",
  "email" : "test@yahoo.com" ,
  "password" : "1254avfdf"
}
```

# Edit Profile Info
Change or update profile info

### Request
```json
{
  "avatar" : OPTIONAL ,
  "full_name" : OPTIONAL
}
```
### Response
```json
{
  "full_name" : "John Watson",
  "email" : "test@yahoo.com" ,
  "password" : "1254avfdf"
}
``` 
# Get todos
### Endpoint Details :
`GET /api/todos`


# New Todo
Create a todo and save to database
### Endpoint Details :
`POST /api/todos`
### Request
```json
{
  "title" : "Order Food",
  "completed" : true ,
  "dueDate" : "2024/01/02" OR NULL ,
  "priority" : "LOW-MEDIUM-HIGH" OR NULL
}
```
### Response
```json
{
  "id" : 231648979789565 ,
  "title" : "Order Food",
  "completed" : true ,
  "dueDate" : "2024/01/02" ,
  "priority" : "LOW-MEDIUM-HIGH"
}
```

# Upload
### Endpoint Details :
`POST /api/todos/upload?task_id=98745879651236&image=Binery_File`
### Response
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