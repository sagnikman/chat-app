import { useState } from 'react';
import useConversation from '../store/useConversation';
import toast from 'react-hot-toast';

const useSendMessage = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();

    const sendMessage = async (message) => {
        setLoading(true);
        try {
            const response = await fetch(
                `/api/v1/message/send/${selectedConversation._id}`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ message }),
                }
            );

            const responseData = await response.json();

            if (JSON.stringify(responseData.error) !== '{}') {
                if (responseData.error.explanation) {
                    throw new Error(responseData.error.explanation);
                }
                throw new Error(responseData.error);
            }

            setMessages([...messages, responseData.data]);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };
    return { sendMessage, loading };
};

export default useSendMessage;
