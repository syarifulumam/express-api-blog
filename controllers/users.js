const {Users} = require('../models');

exports.getUsers = async(req,res) => {
    try {
        const users = await Users.findAll({
            attributes: ['id','name','email']
        })
        res.json(users)
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}