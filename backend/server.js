const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const cookieSession = require('cookie-session')

const AccountRouter = require('./routes/account')
const ApiRouter = require('./routes/api')

const MONGO_URI = process.env.MONGODB_URI || 'mongodb+srv://nicolechau:cis197nicole@cluster0.eslsa.mongodb.net/test'

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const app = express()

app.use(express.json())

app.use(cookieSession({
  name: 'session',
  keys: ['hi'],
  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000, // 24 hours
}))

app.use(express.static('dist')) // set the static folder

app.get('/', (req, res) => {
  res.send('hello world')
})

app.use('/account', AccountRouter)

app.use('/api/images', ApiRouter)

// default error handler
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err)
  }
  res.status(500)
  res.json({ error: err.message })
  return res
})

// set favicon
app.get('/favicon.ico', (req, res) => {
  res.status(404).send()
})

// set the initial entry point
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../dist/index.html'))
// })

app.listen(3000, () => {
  console.log('listening on 3000')
  console.log('mongoDB is connected')
})
