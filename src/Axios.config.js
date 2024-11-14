import axios from "axios";
import BaseUrl from "./utils/baseUrl";

export default axios.create({
    baseURL: BaseUrl, // Fixed base URL
    headers: {
        "Content-Type": "application/json" // Fixed content type
    }
});

// Request Interceptor to add the token to the request
axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        // If the token exists, add it to the Authorization header
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
