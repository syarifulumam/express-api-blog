const {check, validationResult} = require('express-validator')

exports.categoryValidator = [
    check('name').trim().not().isEmpty().withMessage('Name tidak boleh kosong').isLength({min:3}).withMessage('Nama minimal 3 karakter').isString().withMessage('Nama hanya boleh berisi huruf'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
          return res.status(422).json({errors: errors.array()});
        next();
    },
]