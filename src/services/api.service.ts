import axios from 'axios';

const apiInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_IGDB_API_URL,
  timeout: 10000,
});

export default apiInstance;
