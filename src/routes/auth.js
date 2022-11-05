const express = require('express')
const router = express.Router()

const {
  registrationMiddleware, authMiddleware,
} = require('../middleware/authMiddleware')

const {
  registrationController,
  loginController,
  logoutController
} = require('../controllers/userController')

router.post('/register', registrationMiddleware, registrationController)
router.get('/login', registrationMiddleware, loginController)
router.post('/logout', authMiddleware, logoutController)

module.exports = router;