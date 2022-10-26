const express = require('express')
const router = express.Router()
const {register,login,logout} = require('../controllers/auth');
const {refreshToken} = require('../controllers/refreshToken')

router.post('/register', register)
router.post('/login', login)
router.delete('/logout', logout)
router.get('/token', refreshToken)

module.exports = router
