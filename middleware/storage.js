const multer = require('multer')

const saveImg = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, './public/uploads')
    },
    filename: (req, file, cb) =>{
        if(file != null){
            const ext = file.originalname.split('.').pop()
            cb(null, Date.now()+'.'+ext)
        }
    }
})

const filterImg = (req, file, cb) =>{
    if(file && file.mimetype === 'image' ||file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' ){
        cb(null, true)
    }else{
        cb(null, false)
    }
}

module.exports.uploadImg = multer({storage: saveImg, fileFilter: filterImg})