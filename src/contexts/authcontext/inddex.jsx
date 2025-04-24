import React, { useContext, useState, useEffect, createContext } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { auth } from "../../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

// Create the AuthContext
const AuthContext = createContext();

// Custom hook to use the context
export function useAuth() {
    return useContext(AuthContext);
}

// AuthProvider component
export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true); // ✅ Fixed: `usestate` → `useState`

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, initializeUser);
        return unsubscribe;
    }, []);

    const initializeUser = async (user) => {
        if (user) {
            setCurrentUser({ ...user });
            setUserLoggedIn(true); // ✅ Fixed: this was missing
        } else {
            setCurrentUser(null);
            setUserLoggedIn(false);
        }
        setLoading(false); // ✅ Fixed: `setloading` → `setLoading`
    };

    const value = {
        currentUser,
        userLoggedIn,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children} {/* ✅ Fixed: `loadind` → `loading` */}
        </AuthContext.Provider>
    );
}

// Main render
ReactDOM.render(
    <React.StrictMode>
        <AuthProvider>
            <App />
        </AuthProvider>
    </React.StrictMode>,
    document.getElementById("root")
);
