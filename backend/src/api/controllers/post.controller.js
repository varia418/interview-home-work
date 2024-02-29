const httpStatus = require('http-status');
const Post = require('../models/post.model');

/**
 * Get post
 * @public
 */
exports.get = (req, res) => {
    const post = Post.get(req.params.postId);
    res.json(post);
};

/**
 * Create new post
 * @public
 */
exports.create = async (req, res, next) => {
    try {
        const post = new Post(req.body);
        const savedPost = await post.save();
        res.status(httpStatus.CREATED);
        res.json(savedPost.transform());
    } catch (error) {
        next(error);
    }
};

/**
 * Replace existing post
 * @public
 */
exports.replace = async (req, res, next) => {
    try {
        const post = Post.get(req.params.postId);
        const newPost = new Post(req.body);

        await post.updateOne(newPost, { override: true, upsert: true });
        const savedPost = await Post.findById(post._id);

        res.json(savedPost);
    } catch (error) {
        next(error);
    }
};

/**
 * Update existing post
 * @public
 */
exports.update = (req, res, next) => {
    const oldPost = Post.get(req.params.postId);
    const updatedInfo = req.body;
    const post = Object.assign(oldPost, updatedInfo);

    post.save()
        .then((updatedPost) => res.json(updatedPost))
        .catch((e) => next(e));
};

/**
 * Get post list
 * @public
 */
exports.list = async (req, res, next) => {
    try {
        const posts = await Post.list(req.query);
        res.json(posts);
    } catch (error) {
        next(error);
    }
};

/**
 * Delete post
 * @public
 */
exports.remove = (req, res, next) => {
    const post = Post.get(req.params.postId);

    post.remove()
        .then(() => res.status(httpStatus.NO_CONTENT).end())
        .catch((e) => next(e));
};
