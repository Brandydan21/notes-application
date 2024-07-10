import { Request, Response } from "express-serve-static-core";
import { User } from "../database";
import {UserSignUpDTO, UserLoginDTO} from '../dtos/UserDTO';
import { generate_token } from "../utils";
import { Op } from "sequelize";

const signUp = async (req: Request<{},{},UserSignUpDTO,{}>, res: Response) =>{
    try{
        const new_user:UserSignUpDTO = req.body;
        const {first_name, last_name, username, email, password} = req.body;

        const existingUsername = await User.findAll({
            where: {
                username: username
                
            },
        });

        const existingEmail = await User.findAll({
            where: {
                email: email
            },
        });

        if (existingEmail.length > 0){
            return res.status(400).json({ error: 'Email already exists' });
        }

        if (existingUsername.length > 0){
            return res.status(400).json({ error: 'Username already exists' });
        }
        
        const newUser: User = await User.create({first_name: first_name, last_name: last_name, username: username, 
            email:email, password:password});
        
        const token: string = generate_token(newUser);

        res.status(201).json({userId:newUser.id, email: newUser.email, first_name: newUser.first_name, last_name:newUser.last_name, username: newUser.username, token: token});

    }catch(error){
        res.status(500).json({ error: 'Internal server error' });
    }

}


const login = async (req: Request<{},{},UserLoginDTO,{}>, res: Response) =>{
    try{
        const new_user:UserLoginDTO = req.body;
        const {email_username, password} = req.body;

        const existingUser: User | null = await User.findOne({
            where: {
                [Op.or]: [
                    { username: email_username },
                    { email: email_username }
                ]
                
            }
        });

        if(existingUser){
            if(existingUser.password === password){
                const token: string = generate_token(existingUser);
                res.status(200).json({userId:existingUser.id,email: existingUser.email, first_name: existingUser.first_name, 
                    last_name:existingUser.last_name, username: existingUser.username, token: token});
            }
            else{
                res.status(404).json({ error: 'Password is incorrect for user' });  
            }
           
        }else{
            res.status(404).json({ error: 'Username or Email not found' });  

        }
        
    }catch(error){
        res.status(500).json({ error: 'Internal server error' });
    }

}


export {signUp, login};