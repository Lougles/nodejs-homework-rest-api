const express = require('express')
const router = express.Router()

const {
  registrationMiddleware,
} = require('../middleware/authMiddleware')

const {
  registrationController,
  loginController
} = require('../controllers/userController')

router.post('/register', registrationMiddleware, registrationController)
router.get('/login', registrationMiddleware, loginController)

module.exports = router;