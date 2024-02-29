const mongoose = require('mongoose');

/**
 * Comment Schema
 * @private
 */
const commentSchema = new mongoose.Schema({
    id: Number,
    postId: Number,
    name: String,
    email: String,
    body: String
});

/**
 * Statics
 */
commentSchema.statics = {
    async get(id) {
        let comment;

        if (mongoose.Types.ObjectId.isValid(id)) {
            comment = await this.findById(id).exec();
        }
        if (comment) {
            return comment;
        }

        throw new APIError({
            message: 'Comment does not exist',
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
 * @typedef Comment
 */
module.exports = mongoose.model('Comment', commentSchema);
