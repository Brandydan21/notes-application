import { useState, useEffect, createContext, useContext}  from "react";
import React from "react";
import { User } from "../types";
import { authContextType } from "../types/auth";
import axios, {AxiosResponse, AxiosError}from 'axios';
import { ErrorResponse } from "../types";


export const AuthContext = createContext<authContextType | null>(null);

const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const userString = localStorage.getItem('user');
        if (userString) {
          const current_user:User = JSON.parse(userString);
          const {userId, token} = current_user;
          const headers = {headers:{'Authorization': `Bearer ${token}`}};
          axios.get(`http://localhost:3000/user/refresh/${userId}`,headers)
          .then((response: AxiosResponse<User> )=> {
            const user: User = response.data;
            console.log(user)
            signIn(user);
        }).catch(()=>{
          alert("Token has expired");
          signOut();
        });
    }
    }, []);

    const signIn = (user: User) => {
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
    };

    const signOut = () => {
        localStorage.removeItem('user');
        setUser(null);
    };
    
    

    return (
        <AuthContext.Provider value={{ user, signIn, signOut }}>
        {children}
      </AuthContext.Provider>
    );
    
};

const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
  
export {AuthProvider, useAuth};




