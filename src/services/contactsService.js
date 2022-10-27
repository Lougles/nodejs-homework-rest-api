const { Contact } = require('../db/contactsDB');
var mongoose = require('mongoose');

const listContactsService = async () => {
  const data = await Contact.find();
  return data;
}

const getContactByIdService = async (id) => {
  const data = await Contact.findById(id)
  return !data ? {status: 404, message: {"message": "Not found"}} : {status: 200, message: data}
}

const removeContactService = async (id) => {
  if(!id){
    return {status: 400, message: {"message": "Enter user id!"}}
  }
  if(!await getContactByIdService(id)){
    return {status: 404, message: {"message": "Not found!"}}
  }
  await Contact.findByIdAndRemove(id)
  return {status: 200, message: {"message": "contact deleted"}}
}

const addContactService = async (body) => {
  const data = await Contact.create({...body})
  return {status: 201, message: data};
}

const updateContactService = async (id, body) => {
  if(!id){
    return {status: 404, message: {"message": "Not found!"}}
  }
  const data = await Contact.findByIdAndUpdate(id, {...body})
  return {status: 200, message: data}
}

 const updateFavoriteService = async (id, favorite) => {
  const data = await Contact.findByIdAndUpdate(id, {$set: {favorite}})
  return {status: 200, message: data}
 }

module.exports = {
  listContactsService,
  getContactByIdService,
  removeContactService,
  addContactService,
  updateContactService,
  updateFavoriteService
}
