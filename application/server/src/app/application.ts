import express, {Express} from 'express';
import dotenv from 'dotenv';
import {sequelize} from './database/models';


dotenv.config()

function sync_db(): void{
    
    const force: boolean = process.env.SYNC_DB?.toUpperCase() === "TRUE";

    sequelize.sync({ force: force }).then(() => {
        console.log('Database synchronized');
    }).catch((err) => {
        console.error('Unable to synchronize the database:', err);
    });
}
   

export function create_app(): Express{
    const app: Express = express();

    const port_string: string | undefined =  process.env.PORT;

    const PORT: number = port_string ? parseInt(port_string, 10) : 3000;

    app.set('port', PORT);

    sync_db();

    app.get('/', (req, res) => {
        res.send('Hello, world!');
    });

    return app;
}



