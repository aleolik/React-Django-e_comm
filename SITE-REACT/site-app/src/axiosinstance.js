import axios from 'axios';

import useAuth from './hooks/useAuth';

const baseURL = `http://127.0.0.1:8000/`;

const axiosInstance = axios.create({
	baseURL: baseURL,
})



export const AxiosPrivate = axios.create({

	baseURL: baseURL,
	timeout: 5000,
	headers: {
        'Content-Type': 'application/json',
        'accept' : 'application/json',
    },
    withCredentials:true
});


export default axiosInstance;


