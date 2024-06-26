import express, {Express} from 'express';
import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config()

function create_db(): Sequelize{
    const DATABASE_NAME = process.env.DATABASE_NAME
    const DATABASE_USERNAME = process.env.DATABASE_USERNAME
    const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD
    const HOST = process.env.HOST
    
    if (!DATABASE_NAME || !DATABASE_USERNAME || !DATABASE_PASSWORD || !HOST) {
        throw new Error("DATBASE ENV VARIABLES MISSING");
    }
    const sequelize: Sequelize = new Sequelize(
        DATABASE_NAME,
        DATABASE_USERNAME,
        DATABASE_PASSWORD,
        {
            host: HOST,
            dialect:'mysql'
        }
    )
    
    return sequelize
}

export function create_app(): Express{
    const app: Express = express();
    const db: Sequelize = create_db()
    const port_string: string | undefined =  process.env.PORT;
    const PORT: number = port_string ? parseInt(port_string, 10) : 3000;
    
    app.set('port', PORT);
    
    app.get('/', (req, res) => {
        res.send('Hello, world!');
    });


    return app
}



