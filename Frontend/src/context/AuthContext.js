import { createContext, useState } from "react";
import { loginApi, registerApi } from "../api/Api";
import toast from "react-hot-toast";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    //State to hold userData
    const [user, setUser] = useState(null)

    const register = async (userData) => {
        try {
            const response = await registerApi(userData);
            if(response.status === 200 || response.status === 201){
                setUser(response.data.userData)
                // console.log(response.data.userData)
                toast.success(response.data.message)
            }
        } catch (error) {
            toast.error(error.response?.data || "An Error Occured")
            throw error;
        }
    }

    const login = async(userData) => {
        try {
            const response = await loginApi(userData);
            if(response.status === 200 || response.status === 201){
                setUser(response.data.userData)
                toast.success(response.data.message)
                localStorage.setItem("userData", JSON.stringify(response.data.userData));
                localStorage.setItem("token", JSON.stringify(response.data.token));
            }
        } catch (error) {
            toast.error(error.response?.data.message || "An Error Occured")
            throw error;
        }
    }

    return (
        <AuthContext.Provider value={{ user, register, login }}>
            {children}
        </AuthContext.Provider>
    );

}


export { AuthContext, AuthProvider };
export default AuthContext;