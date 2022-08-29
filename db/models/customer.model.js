const { Model, DataTypes, Sequelize } = require('sequelize');
const { USER_TABLE } = require('./user.model');

const CUSTOMER_TABLE = 'customers'; // define nombre tabla

const CustomerSchema = {   // define la estructura de la tabla campos y tipo de datos
  id: {
    allowNull: false, // si es obligatorio
    autoIncrement: true, // autoincrementa
    primaryKey: true, // si es un campo primario
    type: DataTypes.INTEGER // tipo de datos
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING
  },
  lastName: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'last_name',

  },
  phone: {
    allowNull: true,
    type: DataTypes.STRING
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at', // asi lo inserta en la tabla de bd
    defaultValue: Sequelize.NOW // valor por defecto fecha del momento registro
  },
  userId:{
     field:'user_id',
     allowNull: false,
     type: DataTypes.INTEGER,
     unique: true,
     references:{
      model: USER_TABLE,
      key: 'id'
     },

     onUpdate:'CASCADE',
     onDelete:'SET NULL'
  }
}

class Customer extends Model {  // define una clase por sequelize // user hereda a model
  static associate(models) {
    // associate
    this.belongsTo(models.User, {as:'user'}); // para hacer la asociacion 1 a 1 la foreing key en customer
    this.hasMany(models.Order, {
        as:'orders',
        foreignKey:'customerId'
    });
  }

  static config(sequelize) { // recibe una conexion (sequelize)
    return {
      sequelize,   // configura
      tableName: CUSTOMER_TABLE, // nombre de la tabla
      modelName: 'Customer', // nombre de la clase se definio en la class extends model
      timestamps: false // desahabilita este campo por defecto
    }
  }
}


module.exports = { CUSTOMER_TABLE, CustomerSchema , Customer } // exporta la tabla, el schema, y el model
