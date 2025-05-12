  import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from './firebase';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    signOut,
    onAuthStateChanged,
} from "firebase/auth";

// Create context
const AuthContext = createContext();

// Optional: Custom function to sign in with email/password (if needed elsewhere)
export const customSignInWithEmailAndPassword = async (email, password) => {
    try {
        const userCredential = await firebaseSignInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Function to sign in with Google
export const signInWithGoogle = async () => {
    try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        return result.user;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Custom hook to access the AuthContext
export function useAuth() {
    return useContext(AuthContext);
}

// AuthProvider component
export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUser(user);
                setUserLoggedIn(true);
            } else {
                setCurrentUser(null);
                setUserLoggedIn(false);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const signup = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const login = (email, password) => {
        return firebaseSignInWithEmailAndPassword(auth, email, password);
    };

    const googleLogin = () => {
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider);
    };

    const logout = () => {
        return signOut(auth);
    };

    const value = {
        currentUser,
        userLoggedIn,
        loading,
        signup,
        login,
        googleLogin,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
