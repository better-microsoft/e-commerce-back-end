'use strict'

const controller = require('lib/wiring/controller')
const models = require('app/models')
const Transaction = models.transaction

const authenticate = require('./concerns/authenticate')
const setUser = require('./concerns/set-current-user')
const setModel = require('./concerns/set-mongoose-model')
const ObjectId = require('mongoose').Types.ObjectId

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const amount = 500
const charge = (req, res) => {
  stripe.customers.create({
    email: req.body.email,
    card: req.body.id
  })
  .then(customer =>
    stripe.charges.create({
      amount,
      description: 'Sample Charge',
      currency: 'usd',
      customer: customer.id
    }))
  .then(charge => res.send(charge))
  .catch(err => {
    console.log('Error:', err)
    res.status(500).send({error: 'Purchase Failed'})
  })
}

const index = (req, res, next) => {
  console.log('owner: ' + req.user)
  Transaction.find({owner: ObjectId(req.user.id)})
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
  destroy,
  charge
}, { before: [
  { method: setUser, only: ['index', 'show'] },
  { method: authenticate, except: ['index', 'show'] },
  { method: setModel(Transaction), only: ['show'] },
  { method: setModel(Transaction, { forUser: true }), only: ['update', 'destroy'] }
] })
