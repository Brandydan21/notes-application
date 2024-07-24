import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import { Request, Response, NextFunction } from "express";
import {UserSignUpDTO} from "../dtos/UserDTO";
import { User } from "../database";
import { AddNoteDTO, AuthReqDTO} from "../dtos/NotesDTO";
import { JwtPayload } from "jsonwebtoken";


dotenv.config()

const SECRET_KEY: string = process.env.SECRET_KEY|| "12345";



const generate_token = (user: User): string =>{

    return jwt.sign({userId: user.id.toString(), email: user.email, username: user.username, first_name:user.first_name,
        last_name: user.last_name}, SECRET_KEY, { expiresIn: '1h' });

}

const authenticate_token = (req:Request<{userId:string, noteId:string}>, res: Response, next: NextFunction) => {
    
    const authHeader = req.headers['authorization'];
    const current_userId = req.params.userId || req.body.userId;
    
    if(authHeader === undefined){
        return res.status(403).send({ message: 'No token provided!' });
    }

    const token = authHeader.split(' ')[1];
    jwt.verify(token, SECRET_KEY, (err,payload)=>{
        
        if(err){
            return res.status(403).send({ error: 'Invalid Token1' });
        }

        if(payload === undefined){
            return res.status(403).send({ error: 'Invalid Token2' });
   
        }
        const jpayload: JwtPayload = payload as JwtPayload;
        
        if(jpayload.userId.toString() !== current_userId.toString()){
            return res.status(403).send({ error: `Invalid Token3`});
        }
                
        next();
    });
}


export {generate_token,authenticate_token}