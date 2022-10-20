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

router.post('/', removeContactController)

router.delete('/:id', addContactController)

router.put('/:id', updateContactController)

module.exports = router
