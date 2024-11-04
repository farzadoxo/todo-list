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
      "dueDate": "2024-10-15"
    },
    {
      "id": 2,
      "title": "Buy groceries",
      "completed": true,
      "dueDate": null
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
  "dueDate": "2024-10-07"
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
  "dueDate": null
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
  "dueDate": null
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
  "dueDate": "2024-10-15"
}
```

## Delete a task

deletes the task data

### Request

`DELETE /api/todos/[id]`

### Response

deleted task HTTP code

#### Success Response (200 OK)

```json
{
  "id": 1,
  "title": "Complete project documentation",
  "completed": false,
  "dueDate": "2024-10-15"
}
```
