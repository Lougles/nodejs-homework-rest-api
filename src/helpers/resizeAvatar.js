const path = require('path')
const publicFolder = path.resolve('public')
const uploadsFolder = path.resolve('uploads')
var Jimp = require('jimp')
const fs = require('fs')

const resize = async (uploadAvtarPath, avatarName, user) => {
  const userFolder = path.join(publicFolder, `${user._id}`)
  const publicAvatarPath = path.join(userFolder, avatarName)
  const uploadAvatarPath = path.join(uploadsFolder, avatarName)
  if (!fs.existsSync(userFolder)) fs.mkdirSync(userFolder)
  if(user.avatarURL) fs.unlink(user.avatarURL, err => err ? err.message: '')
  const image = await Jimp.read(uploadAvtarPath)
  image.resize(150, 150).quality(60)
  await image.writeAsync(uploadAvatarPath)
  fs.rename(uploadAvatarPath, publicAvatarPath, err => err ? err.message : '')
  return publicAvatarPath
}

module.exports = {
  resize
}