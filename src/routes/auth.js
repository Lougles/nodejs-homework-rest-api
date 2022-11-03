const express = require('express')
const router = express.Router()


const {
  registrationController,
  loginController
} = require('../controllers/userController')


router.post('/register', registrationController)
router.get('login', loginController)

module.exports = router;