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
const {
  tryCatch
} = require('../utils/tryCatch')

router.get('/', tryCatch(listContactsController));

router.get('/:id', tryCatch(getContactByIdController))

router.post('/', addContactValidationMiddleware, tryCatch(addContactController))

router.delete('/:id', tryCatch(removeContactController))

router.put('/:id', addContactValidationMiddleware, tryCatch(updateContactController))

router.patch('/favorite/:id', updateFavoriteValidationMiddleware, tryCatch(updateFavoriteController))

module.exports = router
