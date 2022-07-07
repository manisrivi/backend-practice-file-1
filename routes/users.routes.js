const router = require('express').Router();

const service = require('../services/user.service');

router.get('/', service.getAllUsers);
router.get('/:id', service.getUsersById);


module.exports = router;