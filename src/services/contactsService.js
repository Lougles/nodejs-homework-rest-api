const fs = require('fs/promises');
const path = require('path')
const contactsPath = path.resolve('models', 'contacts.json')

const listContactsService = async () => {
  const data = JSON.parse( await fs.readFile(contactsPath, 'utf8'));
  return data;
}

const getContactByIdService = async (id) => {
  const data = JSON.parse( await fs.readFile(contactsPath, 'utf8')).find(i => i.id === id)
  return data;
}

const removeContactService = async (id) => {
  const data = JSON.parse( await fs.readFile(contactsPath, 'utf8')).filter(i => i.id !== id)
  return data;
}

const addContactService = async (body) => {}

const updateContactService = async (id, body) => {}

module.exports = {
  listContactsService,
  getContactByIdService,
  removeContactService,
  addContactService,
  updateContactService,
}
