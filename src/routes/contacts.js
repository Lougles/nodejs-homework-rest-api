const express = require('express')
const router = express.Router()
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact
} = require ('../../models/contacts');


router.get('/', listContacts);

router.get('/:id', getContactById)

router.post('/', removeContact)

router.delete('/:id', addContact)

router.put('/:id', updateContact)

module.exports = router
