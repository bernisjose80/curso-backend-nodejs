const { Model, DataTypes, Sequelize } = require('sequelize');

const USER_TABLE = 'users'; // define nombre tabla

const UserSchema = {   // define la estructura de la tabla campos y tipo de datos
  id: {
    allowNull: false, // si es obligatorio
    autoIncrement: true, // autoincrementa
    primaryKey: true, // si es un campo primario
    type: DataTypes.INTEGER // tipo de datos
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true, // campo unico
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue:'customer'
  },
  role: {
    allowNull: false,
    type: DataTypes.STRING
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at', // asi lo inserta en la tabla de bd
    defaultValue: Sequelize.NOW // valor por defecto fecha del momento registro
  }
}

class User extends Model {  // define una clase por sequelize // user hereda a model
  static associate(models) {
    this.hasOne(models.Customer, {
      as: 'customer',
      foreignKey: 'userId'
    });
  }

  static config(sequelize) { // recibe una conexion (sequelize)
    return {
      sequelize,   // configura
      tableName: USER_TABLE, // nombre de la tabla
      modelName: 'User', // nombre de la clase se definio en la class extends model
      timestamps: false // desahabilita este campo por defecto
    }
  }
}


module.exports = { USER_TABLE, UserSchema, User } // exporta la tabla, el schema, y el model
