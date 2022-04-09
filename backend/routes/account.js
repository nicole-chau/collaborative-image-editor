const express = require('express')

const User = require('../models/user')
const { isAuthenticated } = require('../middlewares/isAuthenticated')

const router = express.Router()

router.post('/signup', async (req, res, next) => {
  const { body: { username, password } } = req

  // username should be unique
  const user = await User.findOne({ username })
  if (user !== null) {
    next(new Error('username already exists'))
  } else {
    try {
      await User.create({ username, password })
      res.send('user creation was successful')
    } catch (e) {
      next(new Error('user creation had a problem'))
    }
  }
})

router.post('/login', async (req, res, next) => {
  const { body: { username, password } } = req

  // verify matching username and password exists
  const user = await User.findOne({ username, password })
  if (user !== null) {
    req.session.username = username
    res.send('login successful')
  } else {
    next(new Error('login failed'))
  }
})

router.post('/logout', isAuthenticated, (req, res) => {
  req.session = null
  console.log('logged out')
  res.send('logout successful')
})

router.post('/verify', (req, res, next) => {
  if (req.session.username) {
    res.send(req.session.username)
  } else {
    next(new Error('not logged in'))
  }
})

module.exports = router
