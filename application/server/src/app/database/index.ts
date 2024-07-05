// src/models/index.ts
import sequelize from './database';
import User from './models/users';
import Image from './models/images';
import Note from './models/notes';


// Associations
User.hasMany(Image, { foreignKey: 'userId' });
Image.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Note, { foreignKey: 'userId' });
Note.belongsTo(User, { foreignKey: 'userId' });

Note.hasMany(Image,{ foreignKey: 'noteId' });
Image.belongsTo(Note, { foreignKey: 'noteId' });


export { sequelize, User, Image, Note };