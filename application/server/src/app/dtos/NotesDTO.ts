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

export {AddNoteDTO,FetchNoteDTO,AuthReqDTO,UpdateNoteDTO};