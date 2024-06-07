const mongoose = require('mongoose');
const { ServerConfig } = require('../../config')

async function connectToMongoDB() {
    try {
        await mongoose.connect(ServerConfig.MONGODB_URI);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log('Error connecting to MongoDB,', error);
    }
} 

module.exports = {
    connectToMongoDB
}