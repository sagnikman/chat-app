import { useEffect, useState } from 'react';
import useConversation from '../store/useConversation';
import toast from 'react-hot-toast';

const useGetMessages = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();

    useEffect(() => {
        const getMessages = async () => {
            setLoading(true);
            try {
                const response = await fetch(
                    `/api/v1/message/${selectedConversation._id}`
                );
                const responseData = await response.json();

                if (JSON.stringify(responseData.error) !== '{}') {
                    if (responseData.error.explanation) {
                        throw new Error(responseData.error.explanation);
                    }
                    throw new Error(responseData.error);
                }

                setMessages(responseData.data);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };
        if (selectedConversation?._id) {
            getMessages();
        }
    }, [selectedConversation?._id, setMessages]);

    return { messages, loading };
};

export default useGetMessages;
