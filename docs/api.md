# API
# Signup

Signup a user

### Request

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

### Request

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