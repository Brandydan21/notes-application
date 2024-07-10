import express, {Express, Router} from 'express';
import { authenticate_token } from '../utils/auth';
import { add_note } from '../controllers';
const noteRoute: Router = express.Router();

//all notes
noteRoute.post("/add-note",authenticate_token, add_note);



export default noteRoute;