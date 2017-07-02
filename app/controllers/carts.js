'use strict'

const controller = require('lib/wiring/controller')
const models = require('app/models')
const Cart = models.cart
const Product = models.product
// const User = models.user
const ObjectId = require('mongoose').Types.ObjectId

const authenticate = require('./concerns/authenticate')
const setUser = require('./concerns/set-current-user')
const setModel = require('./concerns/set-mongoose-model')

const mycart = (req, res, next) => {
  Cart.find()
    .then(carts => res.json({
      carts: carts.map((e) =>
        e.toJSON({ virtuals: true, user: req.user }))
    }))
    .catch(next)
}

const index = (req, res, next) => {
  Cart.find()
    .then(carts => res.json({
      carts: carts.map((e) =>
        e.toJSON({ virtuals: true, user: req.user }))
    }))
    .catch(next)
}

const show = (req, res) => {
  const product = {}
  product.array = []
//  console.log(req.cart.product)
  const promises = []

  Promise.all(req.cart.product.map(function (id) {
    return Product.find({_id: ObjectId(id)})
  })).then(function (products) {
    console.log(products)
    req.cart.product = products
    return res.json({
      cart: req.cart.toJSON({virtuals: true, user: req.user})
    })
  }).catch(function (err) {
    return res.sendStatus(500)
  })
}

const create = (req, res, next) => {
  console.log(req)
  const cart = Object.assign(req.body.cart)
  Cart.create(cart)
    .then(cart =>
      res.status(201)
        .json({
          cart: cart.toJSON({ virtuals: true})
        }))
    .catch(next)
}

const update = (req, res, next) => {
  delete req.body._owner  // disallow owner reassignment.
  Cart.update(req.body.cart)
    .then(() => res.sendStatus(204))
    .catch(next)
    }

const destroy = (req, res, next) => {
  console.log(req)
  Cart.remove()
    .then(() => res.sendStatus(204))
    .catch(next)
}

module.exports = controller({
  index,
  show,
  create,
  update,
  destroy,
  mycart
}, { before: [
  { method: setUser, only: ['index', 'show', 'mycart', 'create'] },
  { method: authenticate, except: ['index', 'show', 'mycart', 'create'] },
  { method: setModel(Cart), only: ['show', 'mycart'] },
  { method: setModel(Cart, { forUser: true }), only: ['destroy'] }
] })
