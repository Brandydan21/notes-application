import { Sequelize } from 'sequelize';

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

export default sequelize;
