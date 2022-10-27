const fs = require('fs/promises');
const { Contact } = require('../db/contactsDB');

const listContactsService = async () => {
  const data = await Contact.find();
  return data;
}

const getContactByIdService = async (id) => {
  const data = await Contact.findById(id)
  return {status: 200, message: data}
}

const removeContactService = async (id) => {
  const {message} = await getContactByIdService(id)
  if(message.id === id){
    await Contact.findByIdAndRemove(id)
    return {status: 200, message: {"message": "contact deleted"}}
  }
  return {status: 400, message: "Not Found"}
}

const addContactService = async (body) => {
  const data = await Contact.create({...body})
  return {status: 201, message: data};
}

const updateContactService = async (id, body) => {
  let {message} = await getContactByIdService(id);
  if(message.id === id){
    await Contact.findByIdAndUpdate(id, {...body})
    const data = await getContactByIdService(id)
    return {status: 200, message: data.message}
  }
  return {status: 400, message: {"message": "Not found"}}
}

 const updateFavoriteService = async (id, favorite) => {
  let {message} = await getContactByIdService(id);
  if(message.id === id) {
    await Contact.findByIdAndUpdate(id, {$set: {favorite}})
    const data = await getContactByIdService(id)
    return {status: 200, message: data.message}
  }
 }

module.exports = {
  listContactsService,
  getContactByIdService,
  removeContactService,
  addContactService,
  updateContactService,
  updateFavoriteService
}
