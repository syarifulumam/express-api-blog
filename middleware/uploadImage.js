const multer = require('multer')
const path = require('path')

const TYPE_IMAGE = {
    "image/jpg" : "jpg",
    "image/jpeg" : "jpeg",
    "image/png" : "png"
}

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,'public/images')
    },
    filename: (req,file,cb) => {
        const fileName = file.originalname.split('.')[0]
        cb(null,fileName + '-' + Date.now() + '.' + TYPE_IMAGE[file.mimetype])
    }
})

exports.upload = multer({
    storage: storage,
    limits: {fileSize: '100000'},
    fileFilter: (req,file,cb) => {
        const fileTypes = /jpeg|jpg|png/
        const mimeType = fileTypes.test(file.mimetype)
        const extname = fileTypes.test(path.extname(file.originalname))
        if(mimeType && extname){
            return cb(null, true)
        }
        cb({message: 'Format file gambar tidak didukung'}, false)
    }
}).single('thumbnail')