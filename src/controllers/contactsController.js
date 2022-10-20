const {
  listContactsService,
  getContactByIdService,
  removeContactService,
  addContactService,
  updateContactService
} = require('../services/contactsService')

const listContactsController = async (req,res) => {
    const result = await listContactsService();
    res.json(result);
}

const getContactByIdController = async (req,res) => {  
  const result = await getContactByIdService(req.params.id);
  if(!result){
    res.status(404).json('incorrect id')
  }
  res.json(result);
}

const removeContactController = async (req,res) => {
  const result = await removeContactService(req.params.id);
  if(!result){
    res.status(404).json('incorrect id')
  }
  res.json(result);
}

const addContactController = async (req,res) => {
  
}

const updateContactController = async (req,res) => {
  
}

module.exports = {
  listContactsController,
  getContactByIdController,
  removeContactController,
  addContactController,
  updateContactController,
}
