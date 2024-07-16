import express, {Express, Router} from 'express';
import { signUp, login, refreshToken,} from '../controllers';
import { authenticate_token } from '../utils/auth';

const userRouter: Router = express.Router();

//all notes
userRouter.post("/sign-up", signUp);
userRouter.post("/login", login);
userRouter.get("/refresh/:userId",authenticate_token,refreshToken);


export default userRouter;