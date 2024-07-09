import { useState, useEffect, createContext, useContext}  from "react";
import React from "react";
import { User } from "../types";
import { authContextType } from "../types/auth";


export const AuthContext = createContext<authContextType | null>(null);

const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const userString = localStorage.getItem('user');
        if (userString) {
          setUser(JSON.parse(userString));
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




