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
 * @typedef Post
 */
module.exports = mongoose.model('Post', postSchema);
