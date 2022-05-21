
import { createContext, useContext, useState } from "react";

export const AuthContext  = createContext({});

export default function AuthProvider  ( {children }){
    const [auth, setAuth] = useState({});

    const [persist_log,set_persist_log] = useState(JSON.parse(localStorage.getItem("persist")) || false)
    return (
        <AuthContext.Provider value={{ auth, setAuth , persist_log , set_persist_log }}>
            {children}
        </AuthContext.Provider>
    )
}



