const { Model, DataTypes, Sequelize } = require('sequelize');
const { ORDER_TABLE } = require('./order.model');
const { PRODUCT_TABLE } = require('./product.model');

const ORDER_PRODUCT_TABLE = 'order-products'; // define nombre tabla

const OrderProductSchema = {   // define la estructura de la tabla campos y tipo de datos
  id: {
    allowNull: false, // si es obligatorio
    autoIncrement: true, // autoincrementa
    primaryKey: true, // si es un campo primario
    type: DataTypes.INTEGER // tipo de datos
  },
  amount:{
    allowNull:false,
    type:DataTypes.INTEGER
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at', // asi lo inserta en la tabla de bd
    defaultValue: Sequelize.NOW // valor por defecto fecha del momento registro
  },
  orderId:{
     field:'order_id',
     allowNull: false,
     type: DataTypes.INTEGER,
      references:{
      model: ORDER_TABLE,
      key: 'id'
     },

     onUpdate:'CASCADE',
     onDelete:'SET NULL'
  },
  productId:{
    field:'product_id',
    allowNull: false,
    type: DataTypes.INTEGER,
     references:{
     model: PRODUCT_TABLE,
     key: 'id'
    },

    onUpdate:'CASCADE',
    onDelete:'SET NULL'
 },

}

class OrderProduct extends Model {  // define una clase por sequelize // user hereda a model
  static associate(models) {
   //
  }

  static config(sequelize) { // recibe una conexion (sequelize)
    return {
      sequelize,   // configura
      tableName: ORDER_PRODUCT_TABLE, // nombre de la tabla
      modelName: 'OrderProduct', // nombre de la clase se definio en la class extends model
      timestamps: false // desahabilita este campo por defecto
    }
  }
}


module.exports = { ORDER_PRODUCT_TABLE, OrderProductSchema , OrderProduct } // exporta la tabla, el schema, y el model
