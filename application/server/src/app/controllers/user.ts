import { Request, Response } from "express-serve-static-core";
import { User } from "../database";
import UserDTO from '../dtos/UserDTO';
import { generate_token } from "../utils";

const signUp = async (req: Request<{},{},UserDTO,{}>, res: Response) =>{
    try{
        const new_user:UserDTO = req.body;
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
        
        const newUser = await User.create({first_name: first_name, last_name: last_name, username: username, 
            email:email, password:password});
        
        const token: string = generate_token(new_user);

        res.status(201).json({email: newUser.email, first_name: newUser.first_name, last_name:newUser.last_name, username: newUser.username, token: token});

    }catch(error){
        res.status(500).json({ error: 'Internal server error' });
    }

}


export {signUp};