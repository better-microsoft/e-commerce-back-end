'use strict'

const controller = require('lib/wiring/controller')
const models = require('app/models')
const Product = models.product

const setModel = require('./concerns/set-mongoose-model')

const index = (req, res, next) => {
  Product.find()
    .then(products => res.json({
      products: products.map((e) =>
        e.toJSON({virtuals: true}))
    }))
    .catch(next)
}

const show = (req, res) => {
  console.log(req.product)
  res.json({
    product: req.product.toJSON()
  })
}

const create = (req, res, next) => {
  console.log(req.body.product)
  Product.create(req.body.product)
    .then(product =>
      res.status(201)
        .json({
          product: product.toJSON({virtuals: true})
        }))
    .catch(next)
}

const update = (req, res, next) => {
  Product.update(req.body.product)
    .then(() => res.sendStatus(204))
    .catch(next)
}

const destroy = (req, res, next) => {
  Product.remove()
    .then(() => res.sendStatus(204))
    .catch(next)
}

module.exports = controller({
  index,
  show,
  create,
  update,
  destroy
},
  { before: [
    { method: setModel(Product), only: ['show'] }
  ]
  })
