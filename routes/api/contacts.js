const express = require('express')
const router = express.Router()
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact
} = require('../../models/contacts');
const {addContactM} = require('../../middleware/addContactMiddleware')

router.get('/', async (req, res, next) => {
  res.json(await listContacts())
})

router.get('/:id', async (req, res, next) => {
  const {status, message} = await getContactById(req.params.id)
  res.status(status).json(message)
})

router.post('/', addContactM, async (req, res, next) => {
  const {status, message} = await addContact(req.body)
  res.status(status).json(message);
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
