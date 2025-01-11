import axios from 'axios';
import Backend_url from '../../config';

const axiosInstance = axios.create({
  baseURL: Backend_url,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
