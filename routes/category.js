const express = require('express')
const router = express.Router()
const {getCategories,createCategory,updateCategory,deleteCategory} = require('../controllers/category')
const {categoryValidator} = require('../middleware/categoryValidator')
const {verifyToken} = require('../middleware/verifyToken')

router.get('/category', verifyToken, getCategories)
router.post('/category', verifyToken, categoryValidator, createCategory)
router.patch('/category/:id', verifyToken, categoryValidator, updateCategory)
router.delete('/category/:id', verifyToken, deleteCategory)

module.exports = router