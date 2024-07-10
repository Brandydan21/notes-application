import { Request, Response } from "express";
import { AddNoteDTO } from "../dtos/NotesDTO";
import { Note } from "../database";


const add_note = async(req: Request<{},{},AddNoteDTO>, res: Response) =>{
    try{
        const new_note: AddNoteDTO = req.body;
        const {userId, note_content} = new_note;
        const newNote: Note = await Note.create({userId:userId, content:note_content});
        res.status(201).json({note:newNote});

    }catch(err){
        res.status(500).json({ error: err });
    }
    
    
}

export {add_note};