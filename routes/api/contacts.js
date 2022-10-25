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

router.get('/', async (req, res) => {
  res.json(await listContacts())
})

router.get('/:id', async (req, res) => {
  const {status, message} = await getContactById(req.params.id)
  res.status(status).json(message)
})

router.post('/', addContactM, async (req, res) => {
  const {status, message} = await addContact(req.body)
  res.status(status).json(message);
})

router.delete('/:id', async (req, res) => {
  const {status, message} = await removeContact(req.params.id)
  res.status(status).json(message);
})

router.put('/:id', addContactM, async (req, res) => {
  const {status, message} = await updateContact(req.params.id, req.body);
  res.status(status).json(message);
})

module.exports = router
