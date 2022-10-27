const express = require('express')
const router = express.Router()
const {
  listContactsController,
  getContactByIdController,
  removeContactController,
  addContactController,
  updateContactController,
  updateFavoriteController
} = require ('../controllers/contactsController');
const {
  addContactValidationMiddleware, 
  updateFavoriteValidationMiddleware
} = require('../middleware/validationMiddleware')

router.get('/', listContactsController);

router.get('/:id', getContactByIdController)

router.post('/', addContactValidationMiddleware, addContactController)

router.delete('/:id', removeContactController)

router.put('/:id', addContactValidationMiddleware, updateContactController)

router.patch('/favorite/:id', updateFavoriteValidationMiddleware, updateFavoriteController)

module.exports = router
