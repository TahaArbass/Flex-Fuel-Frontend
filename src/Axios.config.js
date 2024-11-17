import axios from "axios";
import BaseUrl from "./utils/baseUrl";
import { notifyError } from "./utils/toastNotification";

const Axios = axios.create({
    baseURL: BaseUrl, // Fixed base URL
    headers: {
        "Content-Type": "application/json" // Fixed content type
    }
});

// Request Interceptor to add the token to the request
Axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("authToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        notifyError(error.message);
        return Promise.reject(error);
    }
);

export default Axios;