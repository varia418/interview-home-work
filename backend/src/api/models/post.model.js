const mongoose = require('mongoose');

/**
 * Post Schema
 * @private
 */
const postSchema = new mongoose.Schema({
    id: Number,
    userId: Number,
    title: String,
    body: String
});

/**
 * Statics
 */
postSchema.statics = {
    async get(id) {
        let post;

        if (mongoose.Types.ObjectId.isValid(id)) {
            post = await this.findById(id).exec();
        }
        if (post) {
            return post;
        }

        throw new APIError({
            message: 'Post does not exist',
            status: httpStatus.NOT_FOUND,
        });
    },
    list({
        page = 1, perPage = 30
    }) {

        return this.find()
            .skip(perPage * (page - 1))
            .limit(perPage)
            .exec();
    },
};

/**
 * @typedef Post
 */
module.exports = mongoose.model('Post', postSchema);
