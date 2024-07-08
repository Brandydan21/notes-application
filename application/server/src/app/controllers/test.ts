import { Request, Response } from "express-serve-static-core";

const test = async (req: Request, res: Response) =>{
    try{
        res.status(200).json({ error: 'App Running' });

    }catch(error){
        res.status(500).json({ error: 'Internal server error' });
    }

}


export {test};