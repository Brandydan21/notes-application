import express, {Express, Router} from 'express';
import { authenticate_token } from '../utils/auth';
import { add_note, fetch_all_notes, update_note,delete_note } from '../controllers';
import upload from '../multerConfig/multerConfig';
const noteRoute: Router = express.Router();

//all notes
noteRoute.post("/add-note",authenticate_token,upload.single('image'), add_note);
noteRoute.get("/:userId",authenticate_token, fetch_all_notes);
noteRoute.post("/update-note",authenticate_token, update_note);
noteRoute.delete("/delete/:userId/:noteId",authenticate_token, delete_note);








export default noteRoute;