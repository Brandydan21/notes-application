import express, {Express} from 'express';
import dotenv from 'dotenv';

dotenv.config()


export function create_app(): Express{
    const app: Express = express();
    const port_string: string | undefined =  process.env.PORT;
    const PORT: number = port_string ? parseInt(port_string, 10) : 3000;
    
    app.set('port', PORT);
    
    app.get('/', (req, res) => {
        res.send('Hello, world!');
    });


    return app
}



