const {Users} = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

exports.register = async(req,res) => {
    const {name,email,password,confirmation_password} = req.body
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

exports.login = async(req,res) => {
    try {
        const user = await Users.findOne({
            where:{
                email: req.body.email
            }
        })
        // Cek Password 
        const match = await bcrypt.compare(req.body.password, user.password)
        if(!match) return res.status(400).json({message: "Password salah"})
        
        // buat token
        const {id,name,email,...other} = user
        const accessToken = jwt.sign({id,name,email}, process.env.ACCESS_TOKEN_SECRET,{
            expiresIn: '20s'
        })
        const refreshToken = jwt.sign({id,name,email}, process.env.REFRESH_TOKEN_SECRET,{
            expiresIn: '1d'
        })
        await Users.update({refresh_token: refreshToken},{
            where:{
                id: id
            }
        })
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        })
        res.json({accessToken})
    } catch (error) {
        res.status(400).json({message: "Email tidak terdaftar"})
    }
}

exports.logout = async(req,res) => {
    // ambil token di browser 
    const refreshToken = req.cookies.refreshToken
    if(!refreshToken) return res.sendStatus(204)
    // cari user berdasarkan token
    const user = await Users.findOne({
        where:{
            refresh_token: refreshToken
        }
    })
    if(!user) return res.sendStatus(204)
    await Users.update({refresh_token: null}, {
        where:{
            id: user.id
        }
    })
    res.clearCookie('refreshToken')
    return res.sendStatus(200)
}