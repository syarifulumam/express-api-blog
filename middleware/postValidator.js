const {check, validationResult} = require('express-validator')
const fs = require('fs');

exports.postValidator = [
    check('userId').notEmpty().withMessage('UserId tidak boleh kosong').isNumeric().withMessage('UserId hanya boleh angka'),
    check('categoryId').notEmpty().withMessage('UserId tidak boleh kosong').isNumeric().withMessage('UserId hanya boleh angka'),
    check('title').trim().notEmpty().withMessage('Title tidak boleh kosong').isLength({min:3}).withMessage('Title minimal 3 karakter'),
    check('content').trim().notEmpty().withMessage('Content tidak boleh kosong').isLength({min:10}).withMessage('Title minimal 10 karakter'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()){
          if (req.file !== undefined) {
            fs.unlinkSync(req.file.path);
          }
          return res.status(422).json({errors: errors.array()});
        }
        next();
    },
]