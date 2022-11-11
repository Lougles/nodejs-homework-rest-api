const multer  = require('multer')
const path = require('path')
const direct = path.resolve('uploads')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const filetypes = ['image/jpeg', '/image/jpg', 'image/png'];
    const error = filetypes.includes(file.mimetype) ? null : new Error ('Incorrect extension')
    cb(error, direct)
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
  }
})

const upload = multer({ storage})

module.exports = {
  upload
}