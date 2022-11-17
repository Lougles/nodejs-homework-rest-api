var Jimp = require('jimp');
const path = require('path')
const fs = require('fs')
const uploadsDir = path.resolve('tmp')
const avatarDir = path.resolve('public', 'avatars')


const avatarManipulate = async (avatar, user) => {
  const userDir = path.join(avatarDir, `${user._id}`)
  const uploadAvatarDir = path.join(uploadsDir, avatar.filename)
  const publocAvatarDir = path.join(userDir, avatar.filename)
  if(!fs.existsSync(userDir)) fs.mkdirSync(userDir)
  if(user.avatarURL) fs.unlink(user.avatarURL, err => err ? err : '')
  const image = await Jimp.read(avatar.path)
  image.resize(250, 250).quality(60)
  await image.writeAsync(avatar.path)
  fs.rename(uploadAvatarDir, publocAvatarDir, err => err ? err : '')
  return publocAvatarDir
}

module.exports = {
  avatarManipulate
}