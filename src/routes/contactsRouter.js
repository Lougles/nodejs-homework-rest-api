const express = require('express')
const router = express.Router()
const {
  listContactsController,
  getContactByIdController,
  removeContactController,
  addContactController,
  updateContactController
} = require ('../controllers/contactsController');


router.get('/', listContactsController);

router.get('/:id', getContactByIdController)

router.post('/', addContactController)

router.delete('/:id', removeContactController)

router.put('/:id', updateContactController)

module.exports = router
