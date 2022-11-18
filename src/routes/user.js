const express = require('express')
const router = express.Router()
const {authFieldValidation, subscriptionMiddleware} = require('../middleware/userMiddleware')
const {authMiddleware} = require('../middleware/authMiddleware')
const {upload} = require('../helpers/uploadMulterAvatar')
const {
  registrationController,
  loginController,
  logoutController,
  currentController,
  updateSubscriptionController,
  updateAvatarController
} = require('../controllers/userController')

router.post('/registration', authFieldValidation, registrationController)
router.post('/login', authFieldValidation, loginController)
router.post('/logout', authMiddleware, logoutController)
router.get('/current', authMiddleware, currentController)
router.patch('/subscription', [authMiddleware, subscriptionMiddleware], updateSubscriptionController)
router.patch('/avatar', authMiddleware, upload.single('avatar'), updateAvatarController)


module.exports = router