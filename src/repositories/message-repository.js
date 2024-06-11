const CrudRepository = require('./crud-repository');
const { Message, Conversation } = require('../models');

class MessageRepository extends CrudRepository {
    constructor() {
        super(Message);
    }

    async sendMessage(data) {
        let conversation = await Conversation.findOne({
            participants: { $all: [data.senderId, data.receiverId] },
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [data.senderId, data.receiverId],
            });
        }

        const newMessage = new Message(data);

        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }

        //TODO: Socket IO Functionality

        await Promise.all([conversation.save(), newMessage.save()]);

        return newMessage;
    }

    async getMessages(data) {
        const conversation = await Conversation.findOne({
            participants: { $all: [data.senderId, data.receiverId] },
        }).populate('messages');

        if (conversation == null) {
            return [];
        }

        return conversation.messages;
    }
}

module.exports = MessageRepository;
