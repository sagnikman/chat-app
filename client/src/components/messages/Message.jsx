import { useAuthContext } from '../../context/AuthContext';
import useConversation from '../../store/useConversation';
import { extractTime } from '../../utils/extractTime';

const Message = ({ message }) => {
    const { authUser } = useAuthContext();
    const { selectedConversation } = useConversation();
    const formattedTime = extractTime(message.createdAt);
    const isMessageFromMe = message.senderId === authUser._id;
    const chatClassName = isMessageFromMe ? 'chat-end' : 'chat-start';
    const chatProfilePicture = isMessageFromMe
        ? authUser.profilePicture
        : selectedConversation?.profilePicture;
        
    const bubbleBGColor = isMessageFromMe ? 'bg-blue-900' : 'bg-blue-500';

    return (
        <div className={`chat ${chatClassName}`}>
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img
                        src={chatProfilePicture}
                        alt="Chat Bubble"
                    />
                </div>
            </div>
            <div className={`chat-bubble text-white ${bubbleBGColor}`}>{message.message}</div>
            <div className="chat-footer opacity-90 text-xs text-gray-200 flex gap-1 items-center">
                {formattedTime}
            </div>
        </div>
    );
};

export default Message;
