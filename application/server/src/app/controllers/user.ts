import { Request, Response } from "express-serve-static-core";
import { User } from "../database";
import createUsers from '../dtos/createUsers';

const signUp = async (req: Request<{},{},createUsers,{}>, res: Response) =>{
    try{
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

        res.status(201).json({ message: 'User created successfully', user: newUser });

    }catch(error){
        res.status(500).json({ error: 'Internal server error' });
    }

}


export {signUp};