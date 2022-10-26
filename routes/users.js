const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');
const {verifyToken} = require('../middleware/verifyToken')

/* GET users listing. */
router.get('/', verifyToken, userController.getUsers);

module.exports = router;
