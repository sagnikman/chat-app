const { Logger } = require('../config');
const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/errors/app-error');

class CrudRepository {
    constructor(model) {
        this.model = model;
    }

    async create(data) {
        const response = await this.model.create(data);
        return response;
    }

    async get(id) {
        const response = await this.model.findById(id);
        if(!response) {
            throw new AppError('Not able to find the resource', StatusCodes.NOT_FOUND);
        }
        return response;
    }

    async getAll(data) {
        try {
            const response = await this.model.find({});
            return response;
        } catch (error) {
            Logger.error('Something went wrong in the Crud Repository: getAll');
            throw error
        }
    }

    async update(id, data) {
        const response = await this.model.findByIdAndUpdate(id, data);
        if(!response) {
            throw new AppError('Not able to find the resource', StatusCodes.NOT_FOUND);
        }
        return response;
    }

    async destroy(id) {
        const response = await this.model.findByIdAndDelete(id);
        if(!response) {
            throw new AppError('Not able to find the resource', StatusCodes.NOT_FOUND);
        }
        return response;
    }
}

module.exports = CrudRepository;