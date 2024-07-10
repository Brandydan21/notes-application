import express, {Express, Router} from 'express';
import { signUp, login } from '../controllers';

const userRouter: Router = express.Router();

//all notes
userRouter.post("/sign-up", signUp);
userRouter.post("/login", login);


export default userRouter;