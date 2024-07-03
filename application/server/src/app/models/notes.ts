// src/models/Image.ts
import { Model, DataTypes } from 'sequelize';
import sequelize from '../database';
import User from './users';

class Note extends Model {
    public id!: number;
    public userId!: number;
    public content! : string;
}

Note.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    content: {
        type: new DataTypes.TEXT,
        allowNull: false
    }
}, {
    tableName: 'notes',
    sequelize
});

export default Note;