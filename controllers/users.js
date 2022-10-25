const {Users} = require('../models');

exports.getUsers = async(req,res) => {
    try {
        const users = await Users.findAll()
        res.json(users)
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}