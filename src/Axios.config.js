import axios from "axios";
import BaseUrl from "./utils/baseUrl";

export default axios.create({
    baseURL: BaseUrl, // Fixed base URL
    headers: {
        "Content-Type": "application/json" // Fixed content type
    }
});