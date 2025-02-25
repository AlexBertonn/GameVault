import { isEmail } from '@/validation/user-validation';
import axios from 'axios';
import { createContext, ReactNode, useContext, useState } from 'react';

interface AuthContextType {
    userId: string | null;
    isAuthenticated: boolean;
    login(data: loginData): Promise<void>;
    logout(): void;
}

interface loginData {
    email: string;
    password: string;
}

function validateFormData(data: loginData): boolean {
    const errorMessages: { [key: string]: string } = {};
    if (!isEmail(data.email)) {
        errorMessages.email = "E-mail inválido";
    }
    return Object.keys(errorMessages).length === 0;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [userId, setUserId] = useState<string | null>(
        localStorage.getItem("userId")
    );

    const login = async (data: loginData) => {
        if (validateFormData(data)) {
            const response = await axios.post("http://localhost:8080/auth/login", data);
            const { access_token, userId } = response.data;
            localStorage.setItem("token", access_token);
            localStorage.setItem("userId", userId);
            setUserId(userId);
        }
    }

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        setUserId(null);
    }

    const isAuthenticated = !!userId;


    return (
        <AuthContext.Provider value={{ userId, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
export default AuthContext;

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
