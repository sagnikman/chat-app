import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';

const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const login = async (username, password) => {
        const success = handleInputValidation({ username, password });
        if (!success) {
            return;
        }
        setLoading(true);
        try {
            const response = await fetch('/api/v1/user/signin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });
            const responseData = await response.json();

            if (responseData.data.password) {
                delete responseData.data.password;
            }

            if (JSON.stringify(responseData.error) !== '{}') {
                if (responseData.error.explanation) {
                    throw new Error(responseData.error.explanation);
                }
                throw new Error(responseData.error);
            }
            localStorage.setItem(
                'auth-user',
                JSON.stringify(responseData.data)
            );
            setAuthUser(responseData.data);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };
    return { loading, login };
};

export default useLogin;

function handleInputValidation(data) {
    if (!data.username || !data.password) {
        toast.error('Please fill all the fields');
        return false;
    }
    return true;
}
