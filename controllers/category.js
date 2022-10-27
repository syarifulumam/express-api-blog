const {categories} = require('../models')

exports.getCategories = async(req,res) => {
    try {
        const response = await categories.findAll({
            attributes: ['name']
        })
        res.json(response)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

exports.createCategory = async(req,res) => {
    try {
        await categories.create(req.body)
        res.status(201).json({message: 'Kategori berhasil ditambah'})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

exports.updateCategory = async(req,res) => {
    const category = await categories.findOne({
        where:{
            id: req.params.id
        }
    })
    if(!category) return res.status(400).json({message: 'Data tidak ditemukan'}) 
    try {
        await categories.update(req.body, {
            where:{
                id: category.id
            }
        })
        res.status(200).json({message: 'Kategori berhasil diubah'})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

exports.deleteCategory = async(req,res) => {
    try {
        await categories.destroy({
            where:{
                id: req.params.id
            }
        })
        res.status(200).json({message: 'Kategori berhasil dihapus'})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}