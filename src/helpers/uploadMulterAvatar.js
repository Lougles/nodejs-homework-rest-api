const { Error } = require('mongoose')
const multer = require('multer')
const path = require('path')
const avatar_dir = path.resolve('tmp')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const types = ['image/jpeg', 'image/jpg', 'image/png']
    const error = types.includes(file.mimetype) ? null : new Error ('Incorrect extension')
    cb(error, avatar_dir)
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + path.extname(file.originalname))
  }
})

const upload = multer({ storage })
module.exports = {
  upload
}