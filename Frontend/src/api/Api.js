import axios from "axios";

const Api = axios.create({
    baseURL: "http://localhost:5500/api",
    withCredentials: true,
    headers: {
        "Content-Type": "multipart/form-data"
    }
});

// Configuration for axios
const getAuthHeaders = () => ({
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
});

export const testApi = () => Api.get("/");

export const registerApi = (userData) => Api.post("/user/register", userData);

export const loginApi = (userData) => Api.post("user/login", userData);

export const getProfileApi = (id) => Api.get(`user/profile/${id}`, getAuthHeaders());

//-------------------------  Get Products -------------------------
export const getProductApi = () => Api.get("product/getallproduct")

//-------------------------  Get Products By ID -------------------------
export const getProductByIDApi = (id) => Api.get(`product/product/${id}`)

