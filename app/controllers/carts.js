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

const mycart = (req, res) => {
  res.json({
    cart: req.cart.toJSON({ virtuals: true, user: req.user })
  })
}
  // Cart.find({},function(err,models){
  // console.log(req.cart.owner)
  //        if (err) {
  //           res.sendStatus(500)
  //       } else {
  //           res.json({
  //             models
  //           })
  //         }
  //       })

  // Cart.find({owner: ObjectId(req.cart.owner)},function(err,models){
  //       console.log(req.cart.owner)
  //        if (err) {
  //           res.sendStatus(500)
  //       } else {
  //           res.json({
  //             cart: req.cart.toJSON({ virtuals: true, user: req.user }),
  //             product: models
  //           })
  //         }
  //   })
  //   .catch(next)
  // User.find({_id: ObjectId(req.user)},function(err,models){
  //       console.log(req.cart.owner)
  //        if (err) {
  //           res.sendStatus(500)
  //       } else {
  //           res.json({
  //             cart: req.cart.toJSON({ virtuals: true, user: req.user }),
  //             product: models
  //           })
  //         }
  //   })
  //  }

const show = (req, res) => {
  const product = {}
  product.array = []
  for (let i = 0; i < req.cart.product.length; i++) {
  Product.find({_id: ObjectId(req.cart.product[i])},function(err,products){
        console.log(req.cart.product)
         if (err) {
            res.sendStatus(500)
        } else {
              console.log(products)
              product.array.push(products)
            }
          })
        }
          res.json({
            cart: req.cart.toJSON({ virtuals: true, user: req.user }),
            product: product.array
          })
    }
    // Product.find({_id: ObjectId(req.cart.product[0])},function(err,products){
    //       console.log(req.cart.product)
    //        if (err) {
    //           res.sendStatus(500)
    //       } else {
    //           res.json({
    //             cart: req.cart.toJSON({ virtuals: true, user: req.user }),
    //             product: products
    //           })
    //         }
    //   })

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
  destroy,
  mycart
}, { before: [
  { method: setUser, only: ['index', 'show', 'mycart', 'create'] },
  { method: authenticate, except: ['index', 'show', 'mycart', 'create'] },
  { method: setModel(Cart), only: ['show', 'mycart'] },
  { method: setModel(Cart, { forUser: true }), only: ['destroy'] }
] })
