const faker= require('faker');
const Faker = require('faker/lib');
const boom= require('@hapi/boom');
const { Op } = require('sequelize');
//const pool= require('../libs/postgres.pool');
//const sequelize = require('../libs/sequelize');
const { models } = require('../libs/sequelize');

class ProductsService {

  constructor(){
    this.products= [];
    this.generate();


  }

  async generate(){
    const limit= 100;
    for (let index = 0; index < limit; index++) {
    this.products.push({
      id:faker.datatype.uuid(),
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price(),10),
      image: faker.image.imageUrl(),
      isBlock:faker.datatype.boolean(),
    });

  }
  }

  async create(data) {
    const newProduct = await models.Product.create(data);
    return newProduct;
  }

  //async create(data){
    //const newProduct={
     // id: faker.datatype.uuid(),
      //... data
    //}

    //this.products.push(newProduct)
    //return newProduct;

 // }

  // async find() {
    // return new Promise ((resolve,reject)=>{
      // setTimeout(() => {
       // resolve (this.products)
     // }, 5000);
    // })

  //}

  //async find() {
   // const query='SELECT * FROM tasks';
    //const rta= await this.pool.query(query);
   // return rta.rows;

 // }

 //async find() {
  //const query = 'SELECT * FROM tasks';
  //const [data] = await sequelize.query(query);
  //return data;
//}

async find(query) {
  //const products = await models.Product.findAll({
   // include: ['category']
  //});
  //return products;
  const options = {
    include: ['category'],
    where:{}
  }
  const { limit, offset } = query;
  if (limit && offset) {
    options.limit =  limit;
    options.offset =  offset;
  }

  const {price} = query;
  if (price){
    options.where.price= price;
  }

  const { price_min, price_max } = query;
    if (price_min && price_max) {
      options.where.price = {
        [Op.gte]: price_min,
        [Op.lte]: price_max,
      };
    }

  const products = await models.Product.findAll(options);
  return products;
}


  async findone(id) {
    const product=this.products.find(item=> item.id===id);
    if (!product){
       throw boom.notFound('product not found');
    }

    if (product.isBlock){
      throw boom.conflict('product is block');
    }

    return product

  }

  async update(id,changes){

    const index= this.products.findIndex(item => item.id === id);
     if (index ===-1) {
      throw boom.notFound('product not found');
     }
     const product=this.products[index]
     this.products[index]= {
        ...product,
        ...changes
     };
     return this.products[index];


  }

  async delete(id){
    const index= this.products.findIndex(item=> item.id===id);
    if (index ===-1) {
      throw boom.notFound('product not found');
    }
    this.products.splice(index,1);
    return {id};
  }


}

module.exports= ProductsService
