const {contactShema} = require('../validation/schema');


const addContactM = (req, res, next) => {
  const validation = contactShema(req.body);
  if(validation.error){
    next(validation.error)
  }
  next()
}


module.exports = {
  addContactM
}