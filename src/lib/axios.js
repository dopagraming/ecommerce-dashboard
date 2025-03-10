import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://landy-shop.vercel.app/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;