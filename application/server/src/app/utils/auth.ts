import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import {UserSignUpDTO} from "../dtos/UserDTO";



dotenv.config()

const SECRET_KEY: string = process.env.SECRET_KEY|| "12345";



const generate_token = (user: UserSignUpDTO): string =>{

    return jwt.sign({ email: user.email, username: user.username, first_name:user.first_name,
        last_name: user.last_name}, SECRET_KEY, { expiresIn: '1h' });

}


export {generate_token}