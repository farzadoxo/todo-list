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
