// token to store logged id
import { useState, createContext, useContext, useEffect } from "react";

 const authContext = createContext() 

 export function AuthProvider({children}){
    const [token, setToken] = useState(localStorage.getItem('token'))
    
    const logIn= (token)=>{
        localStorage.setItem('token', token)
        setToken(token)
    }
    const logOut= ()=> {
        localStorage.removeItem('token')
        setToken(null)
    }
    return(
        <authContext.Provider value={{logIn, logOut, token, islogged: !!token}}>
            {children}
        </authContext.Provider>
    )
 }

 export function useAuth(){
    return useContext(authContext)
 }
