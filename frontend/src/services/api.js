import axios from 'axios';

const api = axios.create({
  baseURL: 'http://178.128.155.210',
  timeout: 10000,
});

export default api;
