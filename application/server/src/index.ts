import { create_app } from "./app/application";
import {Express} from 'express';

const app: Express = create_app(); 

const PORT: number = app.get('port');

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});