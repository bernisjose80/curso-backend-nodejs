const boom = require('@hapi/boom');
const pool= require('../libs/postgres.pool');
const { models } = require('./../libs/sequelize');


//const getConnection = require('../libs/postgres');

class CustomerService {
  constructor() {
    this.pool=pool;
    this.pool.on('error',(err)=> console.error(err));
  }

  async create(data) {
    //const newUser= await models.User.create(data.user); una forma de hacerlo
    const newCustomer = await models.Customer.create(data, {
      include: ['user']
    });


    return newCustomer;
  }
 // async create(data) {
   // return data;
  //}

 // async find() {
 //   const client = await getConnection();
 //   const rta = await client.query('SELECT * FROM tasks');
  //  return rta.rows;
  //}

  //async find() {
  //  const query='SELECT * FROM tasks';
   // const rta= await this.pool.query(query);
   // return rta.rows;

 // }

 async find() {
  const rta = await models.Customer.findAll({
    include: ['user']
  });
  return rta;
}

async findOne(id) {
  const Customer = await models.Customer.findByPk(id);
  if (!Customer) {
    throw boom.notFound('user not found');
  }
  return Customer;
}
  //async findOne(id) {
    //return { id };
  //}

  async update(id, changes) {
    const Customer = await this.findOne(id);
    const rta = await user.update(changes);
    return rta;
  }

  async delete(id) {
    const Customer = await this.findOne(id);
    await user.destroy();
    return { id };
  }
}

  //async update(id, changes) {
    //return {
      //id,
      //changes,
    //};
  //}

  //async delete(id) {
    //return { id };
  //}
//}

module.exports = CustomerService;
