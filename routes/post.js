const express = require('express')
const router = express.Router()
const {createPost,getPosts,getPostById,updatePost,deletePost} = require('../controllers/post')
const {upload} = require('../middleware/uploadImage')
const {postValidator} = require('../middleware/postValidator')
const {verifyToken} = require('../middleware/verifyToken')

router.get('/post', getPosts)
router.get('/post/:id', getPostById)
router.post('/post', verifyToken, upload, postValidator, createPost)
router.patch('/post/:id', verifyToken, upload, postValidator, updatePost)
router.delete('/post/:id', verifyToken, deletePost)

module.exports = router