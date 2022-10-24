const express = require('express')
const router = express.Router()
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact
} = require('../../models/contacts');

router.get('/', async (req, res, next) => {
  res.json(await listContacts())
})

router.get('/:id', async (req, res, next) => {
  const {status, message} = await getContactById(req.params.id)
  res.status(status).json(message)
})

router.post('/', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
