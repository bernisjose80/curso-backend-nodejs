const express= require('express');
const productsRouter = require('./products.routers')

const usersRouter = require('./users.routers')
const categoriesRouters = require('./categories.routers')

function routerApi(app){
 const router= express.Router();
 app.use('/api/v1',router)
 router.use('/products', productsRouter)
 router.use('/users', usersRouter)
 router.use('/categories', categoriesRouters)

}

module.exports= routerApi;
