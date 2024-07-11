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

export {AddNoteDTO,FetchNoteDTO,AuthReqDTO};