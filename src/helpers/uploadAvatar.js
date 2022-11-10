const multer  = require('multer')
const path = require('path')
const direct = path.resolve('uploads')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const filetypes = ['image/jpeg', '/image/jpg', 'image/png'];
    const error = filetypes.includes(file.mimetype) ? null : new Error ('wrong file')
    cb(error, direct)
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + '-' + path.extname(file.originalname))
  }
})

// fileFilter: function (req, file, cb) {
//   const filetypes = ['image/jpeg', '/image/jpg', 'image/png'];
//   if(!filetypes.includes(file.mimetype)){
//     cb(null, false)
//   }
//   cb(null, true)
//   cb(new Error('I don\'t have a clue!'))
//   // return cb(JSON.stringify({"message": "You can upload only an image"}))
// },

const upload = multer({ storage})

module.exports = {
  upload
}