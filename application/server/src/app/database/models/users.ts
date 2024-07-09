import { Model, DataTypes } from 'sequelize';
import sequelize from '../database'

class User extends Model {
    public id!: number;
    public first_name!: string;
    public last_name!: string;
    public username!: string;
    public email!: string;
    public password!: string;
}

User.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    first_name: {
      type: new DataTypes.STRING(128),
      allowNull: false
    },
    last_name: {
      type: new DataTypes.STRING(128),
      allowNull: false
    },
    username: {
      type: new DataTypes.STRING(128),
      allowNull: false
    },
    email: {
      type: new DataTypes.STRING(128),
      allowNull: false,
      unique: true
    },
    password: {
      type: new DataTypes.STRING(128),
      allowNull: false
    }
  }, {
    tableName: 'users',
    sequelize,
    timestamps: false 

});
  
export default User;