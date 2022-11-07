const {ContactModel} = require('../models/contactModel')

const getAllContactsService = async(owner, page, favorite) => {
  try {
    if(!page) page = 1;
    const limit = 5;
    const skip = parseInt(page - 1) * parseInt(limit)
    if(!favorite)return {status: 200, message: await ContactModel.find({owner}).skip(skip).limit(limit).select({name: 1, email: 1, phone: 1, favorite: 1}) }
    return {status: 200, message: await ContactModel.find({owner, favorite}).skip(skip).limit(limit).select({name: 1, email: 1, phone: 1, favorite: 1}) }
  } catch (e) {
    return {status: 400, message: {"message": e.message}}
  }
}

const getByIdContactService = async(_id, owner) => {
  try {
    const data = await ContactModel.findById({_id, owner});
    if(!data) return {status: 404, message: {"message": "Not found"}}
    return {status:200, message: data}
  } catch (e) {
    return {status: 400, message: {"message": e.message}}
  }
}

const addContactService = async(body, owner) => {
  try {
    const data = await ContactModel.create({...body, owner});
    return {status: 201, message: {"message": `Contact ${body.name} has beed added:`, data}}
  } catch (e) {
    return {status: 400, message: {"message": e.message}}
  }
}

const removeContactService = async(_id, owner) => {
  try {
    const {message} = await getByIdContactService(_id, owner);
    if(!message.id) return {status: 404, message: {"message": "Not found"}}
    const data = await ContactModel.findByIdAndRemove({_id, owner}, {returnDocument: 'before'});
    return {status: 200, message: {message: `Contact ${message.name} has been removed`, data}}
  } catch (e) {
    return {status: 400, message: {"message": e.message}}
  }
}

const updateContactService = async(_id, body, owner) => {
  try {
    const {message} = await getByIdContactService(_id, owner);
    if(!message.id) return {status: 404, message: {"message": `id:(${id}) Not found`}}
    const data = await ContactModel.findByIdAndUpdate({_id, owner}, {$set: {...body}}, {returnDocument: 'after'});
    return {status: 200, message: {"message": `Contact (${message.name}) has beed updated: `, data}}
  } catch (e) {
    return {status: 400, message: {"message": e.message}}
  }
}

const updateFavoriteFieldService = async(_id, favorite, owner) => {
  try {
    const {message} = await getByIdContactService(_id, owner);
    if(!message.id) return {status: 404, message: {"message": `id:(${id}) Not found`}}
    const data = await ContactModel.findByIdAndUpdate({_id, owner}, favorite, {returnDocument: 'after'});
    return {status: 200, message: {"message": `${message.name}'s favorite field has beed updated.`, data}}
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