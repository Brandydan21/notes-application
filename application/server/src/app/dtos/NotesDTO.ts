interface AddNoteDTO{
    userId:string;    
    note_content:string;
    
}
interface AuthReqDTO{
    userId:string;    

}
interface FetchNoteDTO{
    userId:string;
}

interface UpdateNoteDTO{
    userId:string;
    noteId:string;
    update_content:string;
}

interface DeleteNoteDTO{
    userId: string;
    noteId: string;
}

export {AddNoteDTO,FetchNoteDTO,AuthReqDTO,UpdateNoteDTO, DeleteNoteDTO};