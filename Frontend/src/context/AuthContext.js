import { createContext, useState } from "react";
import { registerApi } from "../api/Api";
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
            toast.error(error.response.data)
            throw error;
        }
    }

    return (
        <AuthContext.Provider value={{ user, register }}>
            {children}
        </AuthContext.Provider>
    );

}


export { AuthContext, AuthProvider };
export default AuthContext;