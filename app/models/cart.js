'use strict'

const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
  product: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: false
  }],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: false
  }]
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: function (doc, ret, options) {
      const userId = (options.user && options.user._id) || false
      ret.editable = userId && userId.equals(doc._owner)
      return ret
    }
  }
})

const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart
