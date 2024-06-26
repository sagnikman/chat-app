import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';

const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const signup = async function (data) {
        const success = handleInputValidation(data);
        if (!success) {
            return;
        }
        setLoading(true);
        try {
            const response = await fetch('/api/v1/user/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            const responseData = await response.json();
            if(responseData.data.password) {
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

    return { loading, signup };
};

export default useSignup;

function handleInputValidation(data) {
    if (
        !data.fullName ||
        !data.username ||
        !data.password ||
        !data.confirmPassword ||
        !data.gender
    ) {
        toast.error('Please fill all the fields');
        return false;
    }

    if (data.password !== data.confirmPassword) {
        toast.error('Passwords do not match');
        return false;
    }

    if (data.password.length < 6) {
        toast.error('Password must be at least 6 characters');
        return false;
    }
    return true;
}
