import React, { useEffect,useState }  from "react";
import { useAuth } from "../../../context/AuthContext";
import axios, {AxiosError,AxiosResponse} from 'axios';
import { ErrorResponse } from "../../../types";
import { content, contentData } from "../../../types";
import { DefaultButton } from "../../common/Button";
import NoteComponent from "../../common/NoteComponent/NoteComponent";
import Box from '@mui/material/Box';

const Contents: React.FC = () =>{
    
    const {user, signOut} = useAuth()
    
    const [notes,setNotes]= useState<content[]>([]);
    
    const logout = () =>{
        signOut();
    }


    useEffect(()=>{
        if(user!== null){
            const{ userId,token } = user;
            const headers = {headers:{'Authorization': `Bearer ${token}`}};
            axios.get(`http://localhost:3000/note/${userId}`,headers)
             .then((response:AxiosResponse<contentData>)=>{
            setNotes(response.data.notes)
            notes.map(note=>{
                
            });


            }).catch((error:AxiosError<ErrorResponse>)=>
            {
                if (error.response && error.response.data){
                alert(error.response.data.error);
                } else {
                alert('An unexpected error occurred');
                }
                logout();
            });     
          }else{
            logout()
            window.location.reload();
          }
    },[]);
    



    return (
        <div>
           {notes.length === 0 ? (
            <p>No notes</p>
          ) : (
            <div>
             <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width:'100vh',
                flexDirection:'column' }}>
              {notes.map(note => (
                <Box  sx={{p:3, display: 'flex', flexDirection:'column', gap: 1}}>
                <NoteComponent key= {note.id} noteId={note.id}  note_content={note.content}/>
                </Box>
              ))}
            </Box>
            </div>
          )}
  
        </div>
      );
}




export default Contents;

