const { Model, DataTypes, Sequelize } = require('sequelize');

const { CATEGORY_TABLE } = require('./category.model');

const PRODUCT_TABLE = 'products'; // define nombre tabla

const ProductSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
  categoryId: {
    field: 'category_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: CATEGORY_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }
}

class Product extends Model {  // define una clase por sequelize // Category hereda a model
  static associate(models) {
    // associate
    this.belongsTo(models.Category, { as: 'category' });

  }

  static config(sequelize) { // recibe una conexion (sequelize)
    return {
      sequelize,   // configura
      tableName: PRODUCT_TABLE, // nombre de la tabla
      modelName: 'Product', // nombre de la clase se definio en la class extends model
      timestamps: false // desahabilita este campo por defecto
    }
  }
}


module.exports = { PRODUCT_TABLE, ProductSchema , Product } // exporta la tabla, el schema, y el model
