const path = require('path')
const fs = require('fs')
const multer = require('multer')

const uploadPath = path.join('public', 'uploads/bookCovers')
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        fs.mkdirSync(uploadPath, { recursive: true })
        cb(null, uploadPath)
    },
    filename: function(req, file, cb){
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const fileName = file.fieldname + '-' + uniqueSuffix
        const fileExtension = '.'+(file.mimetype).split('/')[1]
        cb(null, fileName+fileExtension)
    }
})
const imageMimeTypes = ['image/jpeg', 'image/png']

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        cb(null, imageMimeTypes.includes(file.mimetype))
    },
})

module.exports = upload