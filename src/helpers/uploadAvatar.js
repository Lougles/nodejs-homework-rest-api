const multer  = require('multer')
const path = require('path')
const direct = path.resolve('uploads')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, direct)
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const filetypes = ['.jpeg', '.jpg', '.png'];
    if(filetypes.includes(path.extname(file.originalname))){
      cb(null, file.fieldname + '-' + uniqueSuffix + '-' + path.extname(file.originalname))
    }else {
      cb('Error: Images Only!');
    }
  }
})

const upload = multer({ storage})

module.exports = {
  upload
}