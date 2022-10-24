const fs = require('fs/promises');
const path = require('path')
const contactsPath = path.resolve('models', 'contacts.json')


const listContactsService = async () => {
  const data = JSON.parse( await fs.readFile(contactsPath, 'utf8'));
  return data;
}

const getContactByIdService = async (id) => {
  const data = JSON.parse( await fs.readFile(contactsPath, 'utf8')).find(i => i.id === id);
  if(!data){
    return {status: 404, message: {"message": "Not found"}}
  }
  return {status: 200, message: data}
}

const removeContactService = async (id) => {
  const {message} = await getContactByIdService(id)
  if(!message.id){
    return {status: 400, message: "Not Found"}
  }
  const data = JSON.parse( await fs.readFile(contactsPath, 'utf8')).filter(i => i.id !== id);
  await fs.writeFile(contactsPath, JSON.stringify(data));
  return {status: 200, message: {"message": "contact deleted"}}
}

const addContactService = async (body) => {
  const data = JSON.parse( await fs.readFile(contactsPath, 'utf8'))
  const newData = [...data, body];
  await fs.writeFile(contactsPath ,JSON.stringify(newData));
  return {status: 201, message: newData};
}

const updateContactService = async (id, body) => {
  let {message} = await getContactByIdService(id);
  if(message.id === id){
    const data = JSON.parse( await fs.readFile(contactsPath, 'utf8')).map(i => i.id === id ? Object.assign(i, body) : i);
    await fs.writeFile(contactsPath ,JSON.stringify(data));
    return {status: 200, message: data}
  }
  return {status: 400, message: {"message": "Not found"}}
}

module.exports = {
  listContactsService,
  getContactByIdService,
  removeContactService,
  addContactService,
  updateContactService,
}
