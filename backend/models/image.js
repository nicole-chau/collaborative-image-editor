const mongoose = require('mongoose')

const { Schema, model } = mongoose

const collaboraterSchema = new Schema({
  user: { type: String, required: true },
})

const imageSchema = new Schema({
  url: { type: String, required: true },
  title: { type: String, required: true },
  owner: { type: String, required: true },
  collaboraters: [collaboraterSchema],
  lastEdited: { type: String, required: true },
  brightness: { type: String, required: true },
  contrast: { type: String, required: true },
  saturate: { type: Number, required: true },
  grayscale: { type: Boolean, required: true },
  invert: { type: Boolean, required: true },
  sepia: { type: Boolean, required: true },
})

const Image = model('Image', imageSchema)

module.exports = Image
