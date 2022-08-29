const express = require('express');
const res = require('express/lib/response');
const ProductsService= require('./../services/product.service');
const validatorHandlers= require('./../middlewares/validator.handler');
const {createProductSchema,updateProductSchema,getProductSchema,queryProductSchema}= require('./../schemas/product.schemas');

//const faker= require('faker');
//const Faker = require('faker/lib');
const router= express.Router();
const service= new ProductsService();

router.get('/',
  validatorHandlers(queryProductSchema, 'query'),
  async (req, res, next) => {
    try {
      const products = await service.find(req.query);
      res.json(products);
    } catch (error) {
      next(error);
    }
  }
);
router.get('/:id',
validatorHandlers(getProductSchema,'params'),
async(req,res,next) => {
  try {
    const { id }= req.params
    const product=await service.findone(id);
    res.json(product);

  } catch(error)
   {
    next (error);
  }
}
);

router.post('/',
validatorHandlers(createProductSchema,'body'),
async(req,res) => {
  const body= req.body;
  const newProduct= await service.create(body);
  res.status(201).json(newProduct);
  });

router.patch('/:id',
validatorHandlers(getProductSchema,'params'),
validatorHandlers(updateProductSchema,'body'),
async(req,res,next) => {
  try {
    const body= req.body;
    const { id }= req.params
    const product = await service.update(id,body);
    res.json(product);
  } catch (error) {
    next (error);

  }


});

router.delete('/:id', async(req,res) => {

  const { id }= req.params
  const rta= await service.delete(id);
  res.json(rta);
});

module.exports= router;

