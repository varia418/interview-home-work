const httpStatus = require('http-status');
const Comment = require('../models/comment.model');

/**
 * Get comment
 * @public
 */
exports.get = async (req, res) => {
    const comment = await Comment.get(req.params.commentId);
    res.json(comment);
};

/**
 * Create new comment
 * @public
 */
exports.create = async (req, res, next) => {
    try {
        const comment = new Comment(req.body);
        const savedComment = await comment.save();
        res.status(httpStatus.CREATED);
        res.json(savedComment.transform());
    } catch (error) {
        next(error);
    }
};

/**
 * Replace existing comment
 * @public
 */
exports.replace = async (req, res, next) => {
    try {
        const comment = Comment.get(req.params.commentId);
        const newComment = new Comment(req.body);

        await comment.updateOne(newComment, { override: true, upsert: true });
        const savedComment = await Comment.findById(comment._id);

        res.json(savedComment);
    } catch (error) {
        next(error);
    }
};

/**
 * Update existing comment
 * @public
 */
exports.update = (req, res, next) => {
    const oldComment = Comment.get(req.params.commentId);
    const updatedInfo = req.body;
    const comment = Object.assign(oldComment, updatedInfo);

    comment.save()
        .then((updatedComment) => res.json(updatedComment))
        .catch((e) => next(e));
};

/**
 * Get comment list
 * @public
 */
exports.list = async (req, res, next) => {
    try {
        const comments = await Comment.list(req.query);
        res.json(comments);
    } catch (error) {
        next(error);
    }
};

/**
 * Delete comment
 * @public
 */
exports.remove = (req, res, next) => {
    const comment = Comment.get(req.params.commentId);

    comment.remove()
        .then(() => res.status(httpStatus.NO_CONTENT).end())
        .catch((e) => next(e));
};
