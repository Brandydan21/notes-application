import express, {Express} from 'express';
import dotenv from 'dotenv';
import {sequelize} from './database';
import {userRouter, testRouter} from './routes'
import {cors} from 'cors';

dotenv.config()

function sync_db(): void{
    
    const force: boolean = process.env.SYNC_DB?.toUpperCase() === "TRUE";

    sequelize.sync({ force: force }).then(() => {
        console.log('Database synchronized');
    }).catch((err) => {
        console.error('Unable to synchronize the database:', err);
    });
}

function create_routes(app: Express){
    app.use("/",testRouter);
    app.use("/user", userRouter);
    
}
   

export function create_app(): Express{
    const app: Express = express();
    app.use(cors());
    const port_string: string | undefined =  process.env.PORT;

    const PORT: number = port_string ? parseInt(port_string, 10) : 3000;

    app.set('port', PORT);

    sync_db();
    //parsing middleware
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    create_routes(app);

    return app;
}



