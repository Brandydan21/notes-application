// src/models/index.ts
import sequelize from '../database';
import User from './users';
import Image from './images';
import Note from './notes';

// Associations
User.hasMany(Image, { foreignKey: 'userId' });
Image.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Note, { foreignKey: 'userId' });
Note.belongsTo(User, { foreignKey: 'userId' });

Note.hasMany(Image,{ foreignKey: 'imageId' });
Image.belongsTo(Note, { foreignKey: 'imageId' });

export { sequelize, User, Image, Note };