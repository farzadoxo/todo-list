import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/', // Set your base URL
  timeout: 7000,
});

export default api;
