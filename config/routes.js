'use strict'

module.exports = require('lib/wiring/routes')

// create routes

// what to run for `GET /`
.root('root#root')

// standards RESTful routes
.resources('examples')
.resources('carts')
.patch('/carts-decrease/:id', 'carts#remove')
.resources('products')
.resources('transactions')

// users of the app have special requirements
.post('/sign-up', 'users#signup')
// .delete('/products/:id', 'products#destroy')
.post('/sign-in', 'users#signin')
.delete('/sign-out/:id', 'users#signout')
.patch('/change-password/:id', 'users#changepw')
.patch('/users/:id', 'users#update')
.resources('users', { only: ['index', 'show', 'update'] })

// all routes created
