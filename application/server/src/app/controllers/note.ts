import { Request, Response } from "express";
import { AddNoteDTO, FetchNoteDTO, UpdateNoteDTO, DeleteNoteDTO } from "../dtos/NotesDTO";
import { Note } from "../database";
import {Image} from "../database";


const add_note = async(req: Request<{},{},AddNoteDTO>, res: Response) =>{
    try{
        const new_note: AddNoteDTO = req.body;
        const {userId, note_content} = new_note;
        const newNote: Note = await Note.create({userId:userId, content:note_content});

        if(req.file){
            const newImage = await Image.create({
                path: `/uploads/${req.file.filename}`,
                userId: newNote.userId,
                noteId: newNote.id
            });
            
            res.status(201).json({note:newNote, image:newImage});

        }else{
            res.status(201).json({note:newNote});
        }

    }catch{
        res.status(500).json({ error: "Internal server error"});
    }
    
    
}

const fetch_all_notes = async (req: Request<{userId:string},{},FetchNoteDTO>, res: Response) =>{
    try{
        const userId = req.params.userId;
        
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

const update_note = async (req: Request<{},{},UpdateNoteDTO>, res:Response) =>{
    try{
        const update_data:UpdateNoteDTO = req.body;
        const {userId, update_content,noteId} = update_data;
        
        const note_to_update = await Note.findOne({
            where: {
                id: noteId
            }
        })

        if(note_to_update===null){
            res.status(500).json({error:'Note does not exist'});
        }else{
            note_to_update.content = update_content;
            await note_to_update.save();
            res.status(200).json({ message: 'Note updated successfully', note: note_to_update });
        }

    }catch{
        res.status(500).json({error:'Internal server Error'});

    }
}

const delete_note = async (req: Request<{noteId:string,userId:string},{},DeleteNoteDTO>, res:Response) =>{
    try{
        const noteId = req.params.noteId;
        const userId = req.params.userId;

        const note_to_delete = await Note.findOne({
            where: {
                id: noteId
            }
        })
    
        if (note_to_delete === null){
            res.status(500).json({error:'Note does not exist'});
        }else{
            if(note_to_delete.userId.toString() === userId){
                note_to_delete.destroy()
                res.status(200).json({ message: 'Note deleted successfully' });
            }else{
                res.status(500).json({error:`Token user is not the same ${userId}, ${note_to_delete.userId.toString()}` });
            }
        }
    
    }catch{
        res.status(500).json({error:'Internal server error'});

    }
    
}

export {add_note,fetch_all_notes,update_note, delete_note};