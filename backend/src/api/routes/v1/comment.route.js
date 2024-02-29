const express = require('express');
const controller = require('../../controllers/comment.controller');

const router = express.Router();

router
    .route('/')
    .get(controller.list)
    .post(controller.create);

router
    .route('/:commentId')
    .get(controller.get)
    .put(controller.replace)
    .patch(controller.update)
    .delete(controller.remove);

module.exports = router;
