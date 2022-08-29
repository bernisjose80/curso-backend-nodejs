const boom = require('@hapi/boom');
const pool= require('../libs/postgres.pool');
const { models } = require('./../libs/sequelize');


//const getConnection = require('../libs/postgres');

class UserService {
  constructor() {
    this.pool=pool;
    this.pool.on('error',(err)=> console.error(err));
  }

  async create(data) {
    const newUser = await models.User.create(data);
    return newUser;
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
  const rta = await models.User.findAll({
    include: ['customer']
  });
  return rta;
}

async findOne(id) {
  const user = await models.User.findByPk(id);
  if (!user) {
    throw boom.notFound('user not found');
  }
  return user;
}
  //async findOne(id) {
    //return { id };
  //}

  async update(id, changes) {
    const user = await this.findOne(id);
    const rta = await user.update(changes);
    return rta;
  }

  async delete(id) {
    const user = await this.findOne(id);
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

module.exports = UserService;
