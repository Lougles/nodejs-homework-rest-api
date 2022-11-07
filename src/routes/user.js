const express = require('express')
const router = express.Router()
const {authFieldValidation} = require('../middleware/userMiddleware')
const {
  registrationController,
  loginController
} = require('../controllers/userController')

router.post('/registration', authFieldValidation, registrationController)
router.get('/login', authFieldValidation, loginController)

module.exports = router