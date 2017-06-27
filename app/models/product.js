'use strict'

const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  }
}, {
  toJSON: {
    virtuals: true
  }
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product
