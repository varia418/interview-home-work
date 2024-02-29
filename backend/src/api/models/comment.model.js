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
 * @typedef Comment
 */
module.exports = mongoose.model('Comment', commentSchema);
