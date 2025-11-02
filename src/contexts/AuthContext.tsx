import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

interface User {
    id: number;
    email: string;
    role: string;
}

interface AuthContextType {
    token: string | null;
    user: User | null;
    login: (token: string) => void;
    logout: () => void;
    isAuthenticated: boolean;
    isAdmin: boolean;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export default useAuth;

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const initializeAuth = async () => {
            const storedToken = localStorage.getItem('authToken');

            if (storedToken) {
                try {
                    const decodedUser = decodeToken(storedToken);
                    const isExpired = isTokenExpired(storedToken);

                    if (decodedUser && !isExpired) {
                        setToken(storedToken);
                        setUser(decodedUser);
                    } else {
                        // Token expirado o inválido, limpiar
                        localStorage.removeItem('authToken');
                    }
                } catch (error) {
                    console.error('AuthContext - Error initializing auth:', error);
                    localStorage.removeItem('authToken');
                }
            }
            setIsLoading(false);
        };

        initializeAuth();
    }, []);

    // Verificar expiración del token periódicamente
    useEffect(() => {
        if (!token) {
            return;
        }

        const checkTokenExpiration = () => {
            const expired = isTokenExpired(token);
            if (expired) {
                logout();
            }
        };

        // Verificar cada minuto
        const interval = setInterval(checkTokenExpiration, 60000);

        return () => {
            clearInterval(interval);
        };
    }, [token]);

    const decodeToken = (token: string): User | null => {
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            return { id: payload.id, email: payload.email, role: payload.role };
        } catch (error) {
            console.error('Error decoding token:', error);
            return null;
        }
    };

    const isTokenExpired = (token: string): boolean => {
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            const currentTime = Date.now() / 1000;
            return payload.exp < currentTime;
        } catch (error) {
            console.error('Error checking token expiration:', error);
            return true; // Considerar expirado si hay error
        }
    };

    const login = (newToken: string) => {
        setToken(newToken);
        localStorage.setItem('authToken', newToken);
        const decodedUser = decodeToken(newToken);
        setUser(decodedUser);
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        setIsLoading(false);
        localStorage.removeItem('authToken');
    };

    const isAuthenticated = !!token;
    const isAdmin = user?.role === 'admin';

    return (
        <AuthContext.Provider value={{ token, user, login, logout, isAuthenticated, isAdmin, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};