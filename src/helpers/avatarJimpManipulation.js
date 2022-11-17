var Jimp = require('jimp');
const path = require('path')
const fs = require('fs')
const uploadsDir = path.resolve('tmp')
const avatarDir = path.resolve('public', 'avatars')

const existUserFolder = (folder, avatar) => {
  if(!fs.existsSync(folder)) fs.mkdirSync(userDir)
  if(avatar) fs.unlink(avatar, err => err ? err : '')
}

const jimpResize = async(avatar) => {
  const image = await Jimp.read(avatar)
  image.resize(250, 250).quality(60)
  await image.writeAsync(avatar)
}

const avatarManipulate = async (avatar, user) => {
  const userDir = path.join(avatarDir, `${user._id}`)
  const uploadAvatarDir = path.join(uploadsDir, avatar.filename)
  const publocAvatarDir = path.join(userDir, avatar.filename)
  existUserFolder(userDir, user.avatarURL)
  await jimpResize(avatar.path)
  fs.rename(uploadAvatarDir, publocAvatarDir, err => err ? err : '')
  return publocAvatarDir
}

module.exports = {
  avatarManipulate
}