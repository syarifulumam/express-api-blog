const {check, validationResult} = require('express-validator')

exports.loginValidator = [
    check('email').normalizeEmail().isEmail().withMessage('Email tidak valid'),
    check('password').trim().not().isEmpty().withMessage('Password tidak boleh kosong').isLength({min:8,max:20}).withMessage('Password harus 8 karakter'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
          return res.status(422).json({errors: errors.array()});
        next();
    },
]