'use strict'

const controller = require('lib/wiring/controller')
const models = require('app/models')
const Cart = models.cart
const Product = models.product

const authenticate = require('./concerns/authenticate')
const setUser = require('./concerns/set-current-user')
const setModel = require('./concerns/set-mongoose-model')

const index = (req, res, next) => {
  let carts = []
  Cart.find()
    .then((cart) => {
      for (let i = 0; i < cart.length; i++) {
        carts = (cart[i].product)
      }
      res.json(carts)
    })
    .catch(next)
  // Cart.find()
  //   .then(cart => res.json({
  //     cart: cart.map((e) =>
  //       e.toJSON({ virtuals: true, user: req.user }))
  //   }))
  //   .catch(next)
}

const show = (req, res) => {
  Product.find({},function(err,models){
        console.log(models)
         if (err) {
            res.sendStatus(500)
        } else {
            res.json({
              cart: req.cart.toJSON({ virtuals: true, user: req.user }),
              product: models
            })
          }
    })
}

const create = (req, res, next) => {
  console.log(req.body.cart)
  const cart = Object.assign(req.body.cart)
  Cart.create(cart)
    .then(cart =>
      res.status(201)
        .json({
          cart: cart.toJSON({ virtuals: true, user: req.user })
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
  destroy
}, { before: [
  { method: setUser, only: ['index', 'show', 'create'] },
  { method: authenticate, except: ['index', 'show', 'create'] },
  { method: setModel(Cart), only: ['show'] },
  { method: setModel(Cart, { forUser: true }), only: ['destroy'] }
] })
