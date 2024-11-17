import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(() => {
        const savedToken = localStorage.getItem("authToken");
        const savedUser = JSON.parse(localStorage.getItem("authUser"));
        const loggedIn = localStorage.getItem("loggedIn");
        return savedToken && savedUser ? { token: savedToken, user: savedUser, loggedIn: loggedIn } : null;
    });

    const login = (token, user) => {
        localStorage.setItem("authToken", token);
        localStorage.setItem("authUser", JSON.stringify(user));
        localStorage.setItem("loggedIn", true);
        setAuth({ token, user, loggedIn: true });
    };

    const logout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("authUser");
        setAuth(null);
    };

    return (
        <AuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
