import express, { Router} from 'express';
import { test } from '../controllers';

const testRouter: Router = express.Router();

//all notes
testRouter.get("/", test);


export default testRouter;