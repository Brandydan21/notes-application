import { Request, Response } from "express";
import { AddNoteDTO, FetchNoteDTO } from "../dtos/NotesDTO";
import { Note } from "../database";


const add_note = async(req: Request<{},{},AddNoteDTO>, res: Response) =>{
    try{
        const new_note: AddNoteDTO = req.body;
        const {userId, note_content} = new_note;
        const newNote: Note = await Note.create({userId:userId, content:note_content});
        res.status(201).json({note:newNote});

    }catch{
        res.status(500).json({ error: "Internal server error"});
    }
    
    
}

const fetch_all_notes = async (req: Request<{},{},FetchNoteDTO>, res: Response) =>{
    try{
        const {userId} = req.body;
        const allNotes = await Note.findAll({
            where: {
                userId: userId
            }
        });
        res.status(200).json({notes:allNotes});
        
    }catch{
        res.status(500).json({ error: "Internal server error"});
    }
   
}

export {add_note,fetch_all_notes};