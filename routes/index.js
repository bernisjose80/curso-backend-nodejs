const express= require('express');
const productsRouter = require('./products.routers')
const usersRouter = require('./users.routers')
const categoriesRouter = require('./categories.routers')
const customersRouter = require('./customer.routers')
const orderRouter = require('./orders.routers');

function routerApi(app){
 const router= express.Router();
 app.use('/api/v1',router)
 router.use('/products', productsRouter)
 router.use('/users', usersRouter)
 router.use('/categories', categoriesRouter)
 router.use('/customers', customersRouter)
 router.use('/orders', orderRouter);


}

module.exports= routerApi;

