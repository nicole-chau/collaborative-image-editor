const mongoose = require('mongoose')

const { Schema, model } = mongoose

const collaboraterSchema = new Schema({
  user: { type: String, required: true }
})

const imageSchema = new Schema({
  url: { type: String, required: true },
  title: { type: String, required: true },
  owner: { type: String, required: true },
  collaboraters: [collaboraterSchema],
  lastEdited: { type: String, required: true },
  brightness: { type: Number, required: true },
})

const Image = model('Image', imageSchema)

module.exports = Image
