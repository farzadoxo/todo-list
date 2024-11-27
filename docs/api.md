# API

## Get All Todos

Retrieves a list of all todo items.

### Request

`GET /api/todos/`

### Response

#### Success Response (200 OK)

```json
{
  "todos": [
    {
      "id": 1,
      "title": "Complete project documentation",
      "completed": false,
      "dueDate": "2024-10-15",
      priority: 'low' | 'medium' | 'high' | "none",
    },
    {
      "id": 2,
      "title": "Buy groceries",
      "completed": true,
      "dueDate": null,
      priority: 'low' | 'medium' | 'high' | "none",
    }
  ]
}
```

## New todo

This endpoint is used to add a new task to the todo list.

### Request

**POST** `/api/todos/`

#### Body

The request body must be a JSON object containing the following fields:

- **`title`**: `string`  
  The title of the task. Must not be empty.

- **`completed`**: `boolean`  
  Indicates whether the task is completed. Default is `false`.

- **`dueDate`**: `string` or `null`  
  Optional. The due date for the task in ISO format. Default is `null`.

**Example Request Body**:

```json
{
  "title": "Buy groceries",
  "completed": false,
  "dueDate": "2024-10-07", 
  priority: 'low' | 'medium' | 'high' | "none",
}
```

### Success Response

- **Status Code**: `201 Created`

- **Description**: This response indicates that the task was successfully created.

- **Body**: The response body will contain the newly created task object.

**Example Response Body**:

```json
{
  "id": 1234567890,
  "title": "Buy groceries",
  "completed": false,
  "dueDate": null,
  priority: 'low' | 'medium' | 'high' | "none",
}
```

## completed image

This endpoint is used to add a new image as completed image

### Request

**POST** `/api/upload/`

#### Body

The request body must be a JSON object containing the following fields:

- **`taks_id`**: `string`  
   the related task_id
- **`image`**: `image`  
   the related task_id

**Example Request Body**:

```json
{
  task_id: 14,
  image: IMage,
}
```

### Success Response

- **Status Code**: `201 Created`

- **Description**: This response indicates that the task was successfully created.

- **Body**: The response body will contain the newly created task object.

**Example Response Body**:

```json
{
  task_id: 14,
  image: IMage,
}
```

## Updating a task

updates the task data

### Request

`PATCH /api/todos/[id]`

```json
{
  "title": "Buy groceries",
  "completed": false,
  "dueDate": null,
  priority: 'low' | 'medium' | 'high' | "none",
}
```

NOTE: partial task updates are possible

### Response

updated task data

#### Success Response (200 OK)

```json
{
  "id": 1,
  "title": "Complete project documentation",
  "completed": false,
  "dueDate": "2024-10-15",
  priority: 'low' | 'medium' | 'high' | "none",

}
```

## Delete a task

deletes the task data

### Request

`DELETE /api/todos/[id]`

### Response

deleted task HTTP code

#### Success Response (204 NO CONTENT)

```json
{
  "id": 1,
  "title": "Complete project documentation",
  "completed": false,
  "dueDate": "2024-10-15"
}
```

# Find a Task

Find a task (fetch from database)

### Request

`GET /api/todos/[id]`

### Response

```json
{
  "id" : 1,
  "title" : "wash dishs",
  "completed" : true ,
  "dueDate" : null
}
```

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