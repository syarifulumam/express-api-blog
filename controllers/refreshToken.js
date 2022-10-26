const {Users} = require('../models')
const jwt = require('jsonwebtoken')

exports.refreshToken = async(req,res) => {
    try {
        // ambil token di browser 
        const refreshToken = req.cookies.refreshToken
        if(!refreshToken) return res.sendStatus(401)
        // cari user berdasarkan token
        const user = await Users.findOne({
            where:{
                refresh_token: refreshToken
            }
        })
        if(!user) return res.sendStatus(403)
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err,decoded) => {
            if(err) return res.sendStatus(403)
            const {id,name,email,...other} = user
            const accessToken = jwt.sign({id,name,email}, process.env.ACCESS_TOKEN_SECRET,{expiresIn: '20s'})
            res.json({accessToken})
        })
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}