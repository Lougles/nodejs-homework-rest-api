const express = require('express')
const router = express.Router()
const {addContactMiddleware, favoriteMiddleware} = require('../middleware/contactMiddleware')
const {authMiddleware} = require('../middleware/authMiddleware')
const {
  getAllContactsController,
  getByIdContactController,
  addContactController,
  removeContactController,
  updateContactController,
  updateFavoriteFieldController
} = require('../controllers/contactController')

router.use(authMiddleware)
router.get('/', getAllContactsController)
router.get('/:id', getByIdContactController)
router.post('/', addContactMiddleware, addContactController)
router.delete('/:id', removeContactController)
router.put('/:id', addContactMiddleware, updateContactController)
router.patch('/favorite/:id', favoriteMiddleware, updateFavoriteFieldController)

module.exports = router
