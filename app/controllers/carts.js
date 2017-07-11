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
    console.log(err)
    return res.sendStatus(500)
  })
}

const create = (req, res, next) => {
  console.log(req.user)
  const cart = Object.assign(req.body.cart)
  Cart.create(cart)
    .then(cart =>
      res.status(201)
        .json({
          cart: cart.toJSON({virtuals: true})
        }))
    .catch(next)
}

const update = (req, res, next) => {
  console.log('here is the product id ' + req.body.cart.product)
  console.log(req.user)
  Cart.update({_id: req.user.cartId}, {$push: {product: req.body.cart.product}})
    .then(() => res.sendStatus(204))
    .catch(next)
}

const remove = (req, res, next) => {
  console.log('here is the cart id ' + req.user.cartId)
  console.log('here is the owner id ' + req.user.cartId)
//  delete req.body._owner // disallow owner reassignment.
//   Cart.update(
//     { _id: req.user.cartId },
//     {$unset: {"product.0": 1}}
//   )
// .then(() => res.sendStatus(204))
// .catch(next)
// }
  Cart.find({_id: req.user.cartId})
  .then((products1) => {
    console.log("array of products: " + products1[0].product)
    console.log(req.body.cart.index)
    const index = req.body.cart.index
    console.log("index valeu: " + index)
    if (index > -1) {
      products1[0].product.splice(index, 1)
      return products1[0].product
    }
    return products1[0].product
  })
  .then((products1) => {
    Cart.update(
      {_id: req.user.cartId},
      {$set: {product: []}}
    )
    return products1
  })
  .then((products2) => {
    console.log('Second Promise Input: ' + products2)
    return Cart.update(
      {_id: req.user.cartId},
      {$set: {product: products2}}
    )
  })
  .then(() => res.sendStatus(204))
  .catch(next)
  }
//   Cart.update({_id: req.user.cartId}, {$pop: {product: req.body.cart.product}})
//     .then(() => res.sendStatus(204))
//     .catch(next)
// }

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
  remove
}, { before: [
  { method: setUser, only: ['index', 'show', 'mycart', 'create'] },
  { method: authenticate, except: ['index', 'show', 'create'] },
  { method: setModel(Cart), only: ['show'] },
  { method: setModel(Cart, { forUser: true }), only: ['destroy'] }
] })
