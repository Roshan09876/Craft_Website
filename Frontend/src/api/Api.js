import axios from "axios";

const Api = axios.create({
    baseURL: "http://localhost:5500/api",
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

export const registerApi = (userData) => Api.post("/user/register", userData);

export const loginApi = (userData) => Api.post("user/login", userData);
