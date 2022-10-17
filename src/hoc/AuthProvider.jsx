import { createContext, useContext, useEffect, useState } from "react";
import { AuthService } from "../services/auth.service";


const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [isAuth, setIsAuth] = useState(false)
    useEffect(() => {
        AuthService.getUserData()
            .then(response => {
                setIsAuth(true)
                setUser(response.data)
                return response
            })
            .catch(err => {

            })
    }, [])

    return (
        <AuthContext.Provider value={{ user, setUser, isAuth, setIsAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)