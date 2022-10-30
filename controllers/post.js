const {posts,Users} = require('../models')
const fs = require('fs');

exports.getPosts = async(req,res) => {
    try {
        const response = await posts.findAll({
            attributes: ['title','content','thumbnail'],
            include: [{
                model: Users,
                attributes: ['name','email']
            }]
        })
        res.json(response)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

exports.getPostById = async(req,res) => {
    try {
        const response = await posts.findOne({
            where:{
                id: req.params.id
            },
            attributes: ['title','content','thumbnail'],
            include: [{
                model: Users,
                attributes: ['name','email']
            }]
        })
        res.json(response)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

exports.createPost = async(req,res) => {
    if(req.file === undefined) return res.status(400).json({message: "Thumbnail tidak boleh kosong"})
    try {
        await posts.create({
            thumbnail: req.file.path,
            ...req.body
        })
        res.status(201).json({message: 'Post berhasil ditambah'})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

exports.updatePost = async(req,res) =>{
    const post = await posts.findOne({
        where:{
            id: req.params.id
        }
    })
    if(!post) return res.status(404).json({message: 'Post tidak ditemukan'})
    try {
        let thumbnail = post.thumbnail
        if(req.file !== undefined){
            fs.unlinkSync(post.thumbnail);
            thumbnail = req.file.path
        }
        await posts.update({
            thumbnail: thumbnail,
            ...req.body
        },{
            where:{
                id: req.params.id
            }
        })
        res.status(200).json({message: 'Update post berhasil'})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

exports.deletePost = async (req,res) => {
    const post = await posts.findOne({
        where:{
            id: req.params.id
        }
    });
    if(!post) return res.status(404).json({msg: 'Post tidak ditemukan'});
    fs.unlinkSync(post.thumbnail);
    try {
        await posts.destroy({
            where:{
                id: post.id
            }
        });
        res.status(200).json({msg: 'Post telah dihapus'});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}