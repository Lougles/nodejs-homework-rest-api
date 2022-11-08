const jwt = require('jsonwebtoken');
const { User } = require('../models/userModel');

const authMiddleware = async(req, res, next) => {
  try {
    const {authorization} = req.headers;
    if(!authorization) return res.status(401).json({message: "Unauthorized!"})
    const [, token] = req.headers.authorization?.split(' ')
    if(!token) return res.status(401).json({message: "Unauthorized!"})
    const tokenDecode = jwt.decode(token, process.env.JWT);
    const user = await User.findById(tokenDecode._id);
    if(!user) return res.status(401).json({message: "There is no such user!"})
    if(user.token !== token) return res.status(401).json({message: "Invalid Token!"})
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({message: err.message})
  }
}

module.exports = {
  authMiddleware
}