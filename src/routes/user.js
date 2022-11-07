const express = require('express')
const router = express.Router()
const {authFieldValidation} = require('../middleware/userMiddleware')
const {authMiddleware} = require('../middleware/authMiddleware')
const {
  registrationController,
  loginController,
  logoutController
} = require('../controllers/userController')

router.post('/registration', authFieldValidation, registrationController)
router.get('/login', authFieldValidation, loginController)
router.post('/logout', authMiddleware, logoutController)

module.exports = router