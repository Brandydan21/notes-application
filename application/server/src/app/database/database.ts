import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';


dotenv.config();

const DATABASE_NAME = process.env.DATABASE_NAME;
const DATABASE_USERNAME = process.env.DATABASE_USERNAME;
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
const HOST = process.env.HOST;

if (!DATABASE_NAME || !DATABASE_USERNAME || !DATABASE_PASSWORD || !HOST) {
    throw new Error("DATBASE ENV VARIABLES MISSING");
};

const sequelize: Sequelize = new Sequelize(
    DATABASE_NAME,
    DATABASE_USERNAME,
    DATABASE_PASSWORD,
    {
        host: HOST,
        dialect:'mysql'
    }
);
// Checks authenication 
sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
        throw new Error('Database connection failed');
    });

export default sequelize;
