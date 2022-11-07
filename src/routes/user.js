const express = require('express')
const router = express.Router()
const {authFieldValidation} = require('../middleware/userMiddleware')
const {authMiddleware} = require('../middleware/authMiddleware')
const {
  registrationController,
  loginController,
  logoutController,
  currentController
} = require('../controllers/userController')

router.post('/registration', authFieldValidation, registrationController)
router.get('/login', authFieldValidation, loginController)
router.post('/logout', authMiddleware, logoutController)
router.get('/current', authMiddleware, currentController)

module.exports = router