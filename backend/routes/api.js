const express = require('express')

const Image = require('../models/image')
const User = require('../models/user')
const { isAuthenticated } = require('../middlewares/isAuthenticated')

const router = express.Router()

// retrieve all images
router.get('/', async (req, res, next) => {
  try {
    const images = await Image.find()
    res.json(images)
  } catch (e) {
    next(new Error('error fetching images'))
  }
})

// find image
router.get('/find', async (req, res, next) => {
  const { body: { _id } } = req

  console.log('hi')

  try {
    const image = await Image.findById('6259d1f07080a831bae8fa03')
    console.log(image)
    res.json(image)
  } catch (e) {
    next(new Error('error finding image'))
  }
})

// upload a new image from url
router.post('/upload', isAuthenticated, async (req, res, next) => {
  const { body: { url, title } } = req

  // get author key
  const { session: { username } } = req

  try {
    await Image.create({ url, title, owner: username, lastEdited: username, brightness: 0 })
    res.send(`image ${title} uploaded by ${username} successfully`)
  } catch (e) {
    next(new Error('image upload failed'))
  }
})

// update image url or title
router.post('/update', isAuthenticated, async (req, res, next) => {
  const { body: { _id, url, title, brightness } } = req

  // get author key
  const { session: { username } } = req

  try {
    await Image.updateOne({ _id }, { url, title, lastEdited: username, brightness })
    res.send(`image ${title} updated by ${username} successfully`)
  } catch (e) {
    next(new Error('image update failed'))
  }
})

// share/unshare image with other users
router.post('/share', isAuthenticated, async (req, res, next) => {
  const { body: { _id, collaboraters } } = req

  try {
    const allUsers = await User.find()
    collaboraters.forEach(c => {
      const searchUsers = allUsers.find(u => u.username === c.user)
      if (searchUsers === undefined) {
        throw `at least one of the listed collaboraters does not exist`
      }
    })

    await Image.updateOne({ _id }, { collaboraters })
    res.send(`updated collaboraters successfully`)
  } catch (e) {
    if (e === '') {
      next(new Error('collaborater update failed'))
    } else {
      next(new Error(e))
    }
  }
})

module.exports = router
