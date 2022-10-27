const express = require('express')
const router = express.Router()
const {register,login,logout} = require('../controllers/auth');
const {refreshToken} = require('../controllers/refreshToken')
const {loginValidator} = require('../middleware/loginValidator')
const {registerValidator} = require('../middleware/registerValidator')

router.post('/register', registerValidator, register)
router.post('/login', loginValidator, login)
router.delete('/logout', logout)
router.get('/token', refreshToken)

module.exports = router
