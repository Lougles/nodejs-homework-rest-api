const { Contact } = require('../db/contactsDB');

const listContactsService = async () => {
  try{
    const data = await Contact.find();
    return data;
  } catch (e) {
    return {status: 400, message: {"message": e.message}}
  }
}

const getContactByIdService = async (id) => {
  try{
    const data = await Contact.findById(id)
    return !data ? {status: 404, message: {"message": "Not found"}} : {status: 200, message: data}
  } catch (e) {
    return {status: 400, message: {"message": e.message}}
  }
}

const removeContactService = async (id) => {
  try{
    const {message} = await getContactByIdService(id);
    if(!message.id) return {status: 404, message: {"message": "Not found"}}
    const data = await Contact.findByIdAndRemove(id)
    return {status: 200, message: {"message": "contact deleted", data}}
  } catch (e) {
    return {status: 400, message: {"message": e.message}}
  }
}

const addContactService = async (body) => {
  try{
    const data = await Contact.create({...body})
    return {status: 201, message: data};
  } catch (e) {
    return {status: 400, message: {"message": e.message}}
  }
}

const updateContactService = async (id, body) => {
  try {
    const {message} = await getContactByIdService(id);
    if(!message.id) return {status: 404, message: {"message": "Not found"}}
    const data = await Contact.findByIdAndUpdate(id, {...body}, {returnDocument: 'after'})
    return {status: 200, message: data}
  } catch (e) {
    return {status: 400, message: {"message": e.message}}
  }
}

 const updateFavoriteService = async (id, favorite) => {
   try{
    const {message} = await getContactByIdService(id);
    if(!message.id) return {status: 404, message: {"message": "Not found"}}
    const data = await Contact.findByIdAndUpdate(id, {$set: {favorite}}, {returnDocument: 'after'})
    return {status: 200, message: data};
  } catch (e) {
    return {status: 400, message: {"message": e.message}}
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
