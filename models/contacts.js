const fs = require('fs/promises')
const path = require('path')
const contactsPath = path.resolve('models', 'contacts.json')

const listContacts = async () => {
  return data = JSON.parse( await fs.readFile(contactsPath, 'utf8'));
}

const getContactById = async (id) => {
  const data = JSON.parse( await fs.readFile(contactsPath, 'utf8')).find(i => i.id === id);
  if (data){
    return {status: 200, message: data}
  }
  return {status: 404, message: {"message" : "Not found"}}
}

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
