const express = require('express');
const controller = require('../../controllers/post.controller');

const router = express.Router();

router
    .route('/')
    .get(controller.list)
    .post(controller.create);

router
    .route('/:postId')
    .get(controller.get)
    .put(controller.replace)
    .patch(controller.update)
    .delete(controller.remove);

module.exports = router;
