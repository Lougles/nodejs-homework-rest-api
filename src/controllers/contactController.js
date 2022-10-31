const {
  getAllContactsService,
  getByIdContactService,
  addContactService,
  removeContactService,
  updateContactService,
  updateFavoriteFieldService
} = require('../services/contactService')

const getAllContactsController = async (req, res, next) => {
  const {status, message} = await getAllContactsService();
  res.status(status).json(message);
}

const getByIdContactController = async (req, res, next) => {
  const {status, message} = await getByIdContactService(req.params.id);
  res.status(status).json(message);
}

const addContactController = async (req, res, next) => {
  const {status, message} = await addContactService(req.body);
  res.status(status).json(message);
}

const removeContactController = async (req, res, next) => {
  const {status, message} = await removeContactService(req.params.id);
  res.status(status).json(message);
}

const updateContactController = async (req, res, next) => {
  const {status, message} = await updateContactService(req.params.id, req.body);
  res.status(status).json(message);
}

const updateFavoriteFieldController = async (req, res, next) => {
  const {status, message} = await updateFavoriteFieldService(req.params.id, req.body);
  res.status(status).json(message);
}

module.exports = {
  getAllContactsController,
  getByIdContactController,
  addContactController,
  removeContactController,
  updateContactController,
  updateFavoriteFieldController
}