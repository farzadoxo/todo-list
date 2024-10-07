import api from './axios'; // Adjust the path as necessary
import MockAdapter from 'axios-mock-adapter';

// Create a new instance of the mock adapter
const mock = new MockAdapter(api);

const tasks = [
  {
    "id": 1,
    "title": "Buy groceries",
    "completed": false,
    "dueDate": "2024-10-05"
  },
  {
    "id": 2,
    "title": "Walk the dog",
    "completed": true,
    "dueDate": "2024-10-02"
  },
  {
    "id": 3,
    "title": "Finish project report",
    "completed": false,
    "dueDate": "2024-10-10"
  },
  {
    "id": 4,
    "title": "Call the dentist",
    "completed": false,
    "dueDate": "2024-10-07"
  }
]

// Define mock responses
mock.onGet('/api/todos/').reply(200, {
  todos: tasks

});

// Mocking a POST request to /api/todos
mock.onPost('/api/todos/').reply((config) => {
  const { title, completed } = JSON.parse(config.data); // Parse the request body
  return [201, { id: Math.random(), title, completed }]; // Respond with a new todo object
});

// mock.onPost('/api/todos/').reply(201, {
//   id: Math.random(),
//   title: "something new",
//   completed: false,
//   dueDate: "2024-10-07"
//
// });
