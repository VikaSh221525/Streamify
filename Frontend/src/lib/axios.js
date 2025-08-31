import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000/api', 
    withCredentials: true,  // Allow sending cookies with requests
    headers: {
        'Content-Type': 'application/json',
    },
});