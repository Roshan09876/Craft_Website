import { createContext, useState } from "react";
import { getProfileApi, loginApi, registerApi } from "../api/Api";
import toast from "react-hot-toast";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    //State to hold userData
    // const [user, setUser] = useState(null);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("userData")) || null);
    // const { id } = useParams();

    const register = async (userData) => {
        try {
            const response = await registerApi(userData);
            if (response.status === 200 || response.status === 201) {
                setUser(response.data.userData);
                toast.success(response.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data || "An Error Occured");
            throw error;
        }
    };

    const login = async (userData) => {
        try {
            const response = await loginApi(userData);
            if (response.status === 200 || response.status === 201) {
                setUser(response.data.userData);
                toast.success(response.data.message);
                console.log(response.data)
                await localStorage.setItem("userData", JSON.stringify(response.data.userData));
                await localStorage.setItem("token", response.data.token);
            }
        } catch (error) {
            toast.error(error.response?.data.message || "An Error Occured");
            throw error;
        }
    };

    const getProfile = async () => {
        try {
            const token = JSON.parse(atob(localStorage.getItem('token').split('.')[1]));
            const id = token.id;

            if (!id) {
                throw new Error("User ID not found in token");
            }

            const response = await getProfileApi(id);
            if (response.status === 200) {
                console.log("User data fetched: ", response.data.user);
                setUser(response.data.user);
            }
        } catch (error) {
            toast.error(error.response?.data.message || "An Error Occurred");
            throw error;
        }
    };

    const logout = async () => {
        localStorage.clear();
        window.location.reload();
    }

    return (
        <AuthContext.Provider value={{ user, register, login, getProfile, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
export default AuthContext;
