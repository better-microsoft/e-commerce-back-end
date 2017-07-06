'use strict'

const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema({
  product: {
    type: Array,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  stripe: {
    type: Array,
    require: true
  }
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

const Transaction = mongoose.model('Transaction', transactionSchema)

module.exports = Transaction
