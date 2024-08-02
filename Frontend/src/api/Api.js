import axios from "axios";

const Api = axios.create({
    baseURL: "http://localhost:5500",
    withCredentials: true,
    headers: {
        "Content-Type": "multipart/form-data"
    }
});

// Configuration for axios
const config = {
    headers: {
        'authorization': `Bearer ${localStorage.getItem('token')}`
    }
};

export const testApi = () => Api.get("/", config);
