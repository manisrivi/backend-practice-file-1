const router = require('express').Router();

const service = require('../services/post.service');

router.get('/', service.getAllPosts);
router.get('/:id', service.getPostById);
router.post('/', service.createPost);
router.put('/:id', service.updatePost);
router.delete('/:id', service.deletePost);

module.exports = router;