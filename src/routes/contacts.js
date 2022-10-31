const express = require('express')
const router = express.Router()
const {
  getAllContactsController,
  getByIdContactController,
  addContactController,
  removeContactController,
  updateContactController,
  updateFavoriteFieldController
} = require('../controllers/contactController')

router.get('/', getAllContactsController)

router.get('/:id', getByIdContactController)

router.post('/', addContactController)

router.delete('/:id', removeContactController)

router.put('/:id', updateContactController)

router.patch('/favorite/:id', updateFavoriteFieldController)

module.exports = router
