const { Model, DataTypes, Sequelize } = require('sequelize');

const CATEGORY_TABLE = 'categories'; // define nombre tabla

const CategorySchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
}

class Category extends Model {  // define una clase por sequelize // Category hereda a model
  static associate(models) {
    // associate
      this.hasMany(models.Product, {
        as:'products',
        foreignKey:'categoryId'
      });
    //this.belongsTo(models.User, {as:'user'}) // para hacer la asociacion 1 a 1 la foreing key en customer

  }

  static config(sequelize) { // recibe una conexion (sequelize)
    return {
      sequelize,   // configura
      tableName: CATEGORY_TABLE, // nombre de la tabla
      modelName: 'Category', // nombre de la clase se definio en la class extends model
      timestamps: false // desahabilita este campo por defecto
    }
  }
}


module.exports = { CATEGORY_TABLE, CategorySchema , Category } // exporta la tabla, el schema, y el model
