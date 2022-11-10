const express = require('express')
const router = express.Router()
const {upload} = require('../helpers/uploadAvatar')
// const upload = multer().single('avatar')
const {authFieldValidation, subscriptionMiddleware, uploadFile} = require('../middleware/userMiddleware')
const {authMiddleware} = require('../middleware/authMiddleware')
const {
  registrationController,
  loginController,
  logoutController,
  currentController,
  updateSubscriptionController,
  updateAvatarController
} = require('../controllers/userController')

router.post('/registration', authFieldValidation, registrationController)
router.get('/login', authFieldValidation, loginController)
router.post('/logout', authMiddleware, logoutController)
router.get('/current', authMiddleware, currentController)
router.patch('/subscription', [authMiddleware, subscriptionMiddleware], updateSubscriptionController)
router.patch('/avatar', [authMiddleware], upload.single('avatar'), updateAvatarController)


module.exports = router