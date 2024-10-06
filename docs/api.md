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
