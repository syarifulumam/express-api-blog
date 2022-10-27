const {check, validationResult} = require('express-validator')
const {Users} = require('../models/')

exports.registerValidator = [
    check('name').trim().isString().withMessage('Nama hanya boleh masukan huruf').isLength({min:2}).withMessage('Nama minimal 2 huruf'),
    check('email').normalizeEmail().isEmail().withMessage('Email tidak valid').custom(async(email) => {
        const checkEmail = await Users.findOne({
            where:{
                email: email
            }
        })
        if(checkEmail) throw new Error('Email sudah ada')
    }),
    check('password').trim().not().isEmpty().withMessage('Password tidak boleh kosong').isLength({min:8,max:20}).withMessage('Password harus 8 karakter'),
    check('confirmation_password').custom((value, {req}) => {
        if(value !== req.body.password){
            throw new Error('Password tidak sama')
        }
        return true
    }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
          return res.status(422).json({errors: errors.array()});
        next();
    },
]