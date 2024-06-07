const CrudRepository = require('./crud-repository');
const { User } = require('../models');

class UserRepository extends CrudRepository {
    constructor() {
        super(User);
    }

    async getUserByUsername(username) {
        const user = await User.findOne({ username: username });
        return user;
    }

    async getUsersForSidebar(loggedInUserId) {
        const users = await User.find({ _id: { $ne: loggedInUserId } }).select(
            '-password'
        );
        return users;
    }
}

module.exports = UserRepository;
