const fs = require('fs/promises')
const path = require('path')
const contactsPath = path.resolve('models', 'contacts.json')

const listContacts = async () => {
  return data = JSON.parse( await fs.readFile(contactsPath, 'utf8'));
}

const getContactById = async (contactId) => {}

const removeContact = async (contactId) => {}

const addContact = async (body) => {}

const updateContact = async (contactId, body) => {}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
