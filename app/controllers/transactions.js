'use strict'

const controller = require('lib/wiring/controller')
const models = require('app/models')
const Transaction = models.transaction

const authenticate = require('./concerns/authenticate')
const setUser = require('./concerns/set-current-user')
const setModel = require('./concerns/set-mongoose-model')

const index = (req, res, next) => {
  Transaction.find()
    .then(transactions => res.json({
      transactions: transactions.map((e) =>
        e.toJSON({ virtuals: true, user: req.user }))
    }))
    .catch(next)
}

const show = (req, res) => {
  res.json({
    transaction: req.transaction.toJSON({ virtuals: true, user: req.user })
  })
}

const create = (req, res, next) => {
  const transaction = Object.assign(req.body.transaction, {
    _owner: req.user._id
  })
  Transaction.create(transaction)
    .then(transaction =>
      res.status(201)
        .json({
          transaction: transaction.toJSON({ virtuals: true, user: req.user })
        }))
    .catch(next)
}

const update = (req, res, next) => {
  delete req.body._owner  // disallow owner reassignment.
  req.transaction.update(req.body.transaction)
    .then(() => res.sendStatus(204))
    .catch(next)
}

const destroy = (req, res, next) => {
  req.transaction.remove()
    .then(() => res.sendStatus(204))
    .catch(next)
}

module.exports = controller({
  index,
  show,
  create,
  update,
  destroy
}, { before: [
  { method: setUser, only: ['index', 'show'] },
  { method: authenticate, except: ['index', 'show'] },
  { method: setModel(Transaction), only: ['show'] },
  { method: setModel(Transaction, { forUser: true }), only: ['update', 'destroy'] }
] })
