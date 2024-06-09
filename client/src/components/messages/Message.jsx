const Message = () => {
    return <div className="chat chat-end">
        <div className="chat-image avatar">
            <div className="w-10 rounded-full">
                <img src="https://st4.depositphotos.com/14903220/22197/v/450/depositphotos_221970610-stock-illustration-abstract-sign-avatar-icon-profile.jpg" alt="Chat Bubble" />
            </div>
        </div>
        <div className="chat-bubble text-white bg-blue-500">Hey</div>
        <div className="chat-footer opacity-90 text-xs flex gap-1 items-center">10:15</div>
    </div>;
};

export default Message;
