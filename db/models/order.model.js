const { Model, DataTypes, Sequelize } = require('sequelize');
const { CUSTOMER_TABLE }  = require('./customer.model')

const ORDER_TABLE = 'orders'; // define nombre tabla

const OrderSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  customerId: {
    field:'customer_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references:{
      model:CUSTOMER_TABLE,
      key:'id'

    },
     onUpdate: 'CASCADE',
     onDelete: 'SET NULL'
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
  total:{
    type:DataTypes.VIRTUAL,
    get(){
      if(this.items.length>0)
      {return this.items.reduce((total,item)=>{
        return total+(item.price*item.OrderProduct.amount);
      },0);
    }
return 0;
    }
  }
}

class Order extends Model {  // define una clase por sequelize // Category hereda a model
  static associate(models) {
    // associate
      this.belongsTo(models.Customer, {
        as:'customer'
      });
      this.belongsToMany(models.Product, {
        as:'items',
        through: models.OrderProduct,
        foreignKey:'orderId',
        otherKey:'productId'
      });

    //this.belongsTo(models.User, {as:'user'}) // para hacer la asociacion 1 a 1 la foreing key en customer

  }

  static config(sequelize) { // recibe una conexion (sequelize)
    return {
      sequelize,   // configura
      tableName: ORDER_TABLE, // nombre de la tabla
      modelName: 'Order', // nombre de la clase se definio en la class extends model
      timestamps: false // desahabilita este campo por defecto
    }
  }
}


module.exports = { ORDER_TABLE, OrderSchema , Order } // exporta la tabla, el schema, y el model
