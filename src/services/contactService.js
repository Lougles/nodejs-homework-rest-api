const {ContactModel} = require('../models/contactModel')

const getAllContactsService = async() => {
  try {
    return {status: 200, message: await ContactModel.find() }
  } catch (e) {
    return {status: 400, message: {"message": e.message}}
  }
}

const getByIdContactService = async(id) => {
  try {
    const data = await ContactModel.findById(id);
    if(!data) return {status: 404, message: "NotFound"}
    return {status:200, message: data}
  } catch (e) {
    return {status: 400, message: {"message": e.message}}
  }
}

const addContactService = async(body) => {
  try {
    const data = await ContactModel.create(...body);
    return {status: 201, message: data}
  } catch (e) {
    return {status: 400, message: {"message": e.message}}
  }
}
const removeContactService = async(id) => {
  try {
    const {message} = await getByIdContactService(id);
    if(!message.id) return {status: 404, message: "Not found"}
    const data = await ContactModel.findByIdAndRemove(id);
    return {status: 200, message: "Contact removed", data}
  } catch (e) {
    return {status: 400, message: {"message": e.message}}
  }
}

const updateContactService = async(id, body) => {
  try {
    const {message} = await getByIdContactService(id);
    if(!message.id) return {status: 404, message: "Not found"}
    const data = await ContactModel.findByIdAndUpdate(id, ...body, {returnDocument: 'after'});
    return {status: 200, message: "Contact has beed updated: ", data}
  } catch (e) {
    return {status: 400, message: {"message": e.message}}
  }
}

const updateFavoriteFieldService = async(id, favorite) => {
  try {
    const {message} = await getByIdContactService(id);
    if(!message.id) return {status: 404, message: "Not found"}
    const data = await ContactModel.findByIdAndUpdate(id, favorite, {returnDocument: 'after'});
    return {status: 200, message: "Favorite Field has beed updated: ", data}
  } catch (e) {
    return {status: 400, message: {"message": e.message}}
  }
}

module.exports = {
  getAllContactsService,
  getByIdContactService,
  addContactService,
  removeContactService,
  updateContactService,
  updateFavoriteFieldService
}