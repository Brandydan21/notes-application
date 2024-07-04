// src/models/Image.ts
import { Model, DataTypes } from 'sequelize';
import sequelize from '../database';
import User from './users';
import Note from './notes'

class Image extends Model {
  public id!: number;
  public path!: string;
  public userId!: number;
  public noteId!: number;
}

Image.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  path: {
    type: new DataTypes.STRING(128),
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  noteId:{
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    references:{
        model: Note,
        key:'id'
    }
  }
}, {
  tableName: 'images',
  sequelize,
  timestamps: false 

});

export default Image;