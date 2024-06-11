import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const useGetConversations = () => {
    const [loading, setLoading] = useState(false);
    const [conversations, setConversations] = useState([]);

    useEffect(() => {
        const getConversations = async () => {
            setLoading(true);
            try {
                const response = await fetch('/api/v1/user', {
                    method: 'GET',
                });
                const responseData = await response.json();

                if (JSON.stringify(responseData.error) !== '{}') {
                    if (responseData.error.explanation) {
                        throw new Error(responseData.error.explanation);
                    }
                    throw new Error(responseData.error);
                }
                setConversations(responseData.data);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        getConversations();
    }, []);
    return { loading, conversations };
};

export default useGetConversations;
