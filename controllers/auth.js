const {Users} = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

exports.register = async(req,res) => {
    const {name,email,password,confirmation_password} = req.body
    // Password tidak sama dengan Konfirmasi Password 
    if(password !== confirmation_password) return res.status(400).json({
        message : "Password dan Konfirmasi Password tidak sama"
    })
    // Email sudah terdaftar
    const findEmail = await Users.findOne({
        where:{
            email: email
        }
    })
    if(findEmail !== null) return res.status(400).json({
        message : "Email sudah terdaftar"
    })
    // Hash Password 
    const salt = await bcrypt.genSalt()
    const hashPassword = await bcrypt.hash(password,salt)
    // Insert data ke database
    try {
        await Users.create({
            name: name,
            email: email,
            password: hashPassword
        })
        res.status(201).json({message: "Register Berhasil"})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}
