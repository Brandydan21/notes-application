import express, {Express, Router} from 'express';
import { authenticate_token } from '../utils/auth';
import { add_note, fetch_all_notes} from '../controllers';
const noteRoute: Router = express.Router();

//all notes
noteRoute.post("/add-note",authenticate_token, add_note);
noteRoute.get("/",authenticate_token, fetch_all_notes);




export default noteRoute;