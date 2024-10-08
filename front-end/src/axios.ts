import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3500', // Set your base URL
});

export default api;
