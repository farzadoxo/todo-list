import api from './axios'; // Adjust the path as necessary
import MockAdapter from 'axios-mock-adapter';

// Create a new instance of the mock adapter
const mock = new MockAdapter(api);

const tasks = [
  {
    "id": 1,
    "title": "Buy groceries",
    "completed": false,
    "dueDate": "2024-10-05",
    "priority": null // Added priority
  },
  {
    "id": 2,
    "title": "Walk the dog",
    "completed": true,
    "dueDate": "2024-10-02",
    "priority": "low" // Added priority
  },
  {
    "id": 3,
    "title": "Finish project report",
    "completed": false,
    "dueDate": "2024-10-10",
    "priority": "high" // Added priority
  },
  {
    "id": 4,
    "title": "Call the dentist",
    "completed": false,
    "dueDate": "2024-10-07",
    "priority": "medium" // Added priority
  }
];

// Define mock responses
mock.onGet('/api/todos/').reply(200, {
  todos: tasks
});

// Mocking a POST request to /api/todos
mock.onPost('/api/todos/').reply((config) => {
  const { title, completed, dueDate, priority } = JSON.parse(config.data); // Parse the request body
  return [201, { id: Math.random(), title, completed, dueDate, priority }]; // Respond with a new todo object including priority
});

// Mock the POST request for image uploads
mock.onPost('/api/upload/').reply(200, {
  message: 'Image uploaded successfully',
});
