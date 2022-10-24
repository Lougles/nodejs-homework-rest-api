const fs = require('fs/promises')
const path = require('path')
const contactsPath = path.resolve('models', 'contacts.json');
const {v4} = require('uuid')

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

const addContact = async (body) => {
  const data = JSON.parse( await fs.readFile(contactsPath, 'utf8'));
  const newContact = {id: v4(), ...body}
  data.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(data))
  return {status: 201, message: newContact}
}

const removeContact = async (id) => {
  const {message} = await getContactById(id);
  if (message.id === id){
    const data = JSON.parse( await fs.readFile(contactsPath, 'utf8')).filter(i => i.id !== id);
    await fs.writeFile(contactsPath, JSON.stringify(data));
    return {status: 200, message: {"message": "contact deleted"}}
  }
  return {status: 404, message: {"message": "Not found"}}
}


const updateContact = async (id, body) => {}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
