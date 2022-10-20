const express = require('express')
const router = express.Router()
const {
  getContactController
} = require ('../controllers/contactsController');


router.get('/', getContactController);

router.get('/:contactId', )

router.post('/', )

router.delete('/:contactId', )

router.put('/:contactId', )

module.exports = router
