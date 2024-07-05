import express, {Express, Router} from 'express';
import { signUp } from '../controllers/user';

const userRouter: Router = express.Router();

//all notes
userRouter.post("/sign-up", signUp);


export default userRouter;