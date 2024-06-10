import { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';

const useLogout = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const logout = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/v1/user/logout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            });
            const responseData = response.json();
            if (responseData.error) {
                throw new Error(responseData.error);
            }
            localStorage.removeItem('auth-user');
            setAuthUser(null);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };
    return { loading, logout };
};

export default useLogout;
