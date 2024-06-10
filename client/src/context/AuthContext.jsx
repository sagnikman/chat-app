import { createContext, useState, useContext } from 'react';

export const AuthContext = createContext();

export const useAuthContext = () => {
    return useContext(AuthContext);
}

export const AuthContextProvider = ({ children }) => {
    const localStorageAuthUser = JSON.parse(localStorage.getItem('auth-user'));
    const [authUser, setAuthUser] = useState(localStorageAuthUser || null);
    return (
        <AuthContext.Provider value={{ authUser, setAuthUser }}>
            {children}
        </AuthContext.Provider>
    );
};
