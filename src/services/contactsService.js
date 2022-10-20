const fs = require('fs/promises');
const path = require('path')
const contactsPath = path.resolve('models', 'contacts.json')


const listContactsService = async () => {
  const data = JSON.parse( await fs.readFile(contactsPath, 'utf8'));
  return data;
}

const getContactByIdService = async (id) => {
  try {
    const data = JSON.parse( await fs.readFile(contactsPath, 'utf8')).find(i => i.id === id);
    if(!data){
      return {status: 404, message: 'Not Found'}
    }
    return {status: 200, message: data}
  } catch (e) {
    return e.message
  }
}

const removeContactService = async (id) => {
  try {
    if(await getContactByIdService(id)){
      const data = JSON.parse( await fs.readFile(contactsPath, 'utf8')).filter(i => i.id !== id);
      await fs.writeFile(contactsPath, JSON.stringify(data));
      return {status: 200, message: "contact deleted"}
    }
    return {status: 400, message: "Not Found"}
  } catch (e) {
    return e.message
  }
}

const addContactService = async (body) => {
  try {
    
    const data = JSON.parse( await fs.readFile(contactsPath, 'utf8'));
    const newData = [...data, body];
    await fs.writeFile(contactsPath ,JSON.stringify(newData));
    return listContactsService();

  } catch (e) {
    return e.message
  }

}

const updateContactService = async (id, body) => {

}

module.exports = {
  listContactsService,
  getContactByIdService,
  removeContactService,
  addContactService,
  updateContactService,
}
