import express, {Express, Router} from 'express';
import { signUp } from '../controllers';

const userRouter: Router = express.Router();

//all notes
userRouter.post("/sign-up", signUp);


export default userRouter;