const fs = require('fs/promises');
const path = require('path')
const contactsPath = path.resolve('models', 'contacts.json')

const listContactsService = async () => {
  const data = JSON.parse( await fs.readFile(contactsPath, 'utf8'));
  return data;
}

const getContactByIdService = async (contactId) => {}

const removeContactService = async (contactId) => {}

const addContactService = async (body) => {}

const updateContactService = async (contactId, body) => {}

module.exports = {
  listContactsService,
  getContactByIdService,
  removeContactService,
  addContactService,
  updateContactService,
}
