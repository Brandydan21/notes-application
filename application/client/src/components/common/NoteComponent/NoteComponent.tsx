import React, { useState } from "react";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { DefaultTextField } from '../TextField';
import { DefaultButton } from '../Button';
import { useAuth } from "../../../context/AuthContext";
import axios, {AxiosResponse, AxiosError} from 'axios';
import { ErrorResponse } from "../../../types";


interface NoteComponent{
    noteId:string | number;
    note_content:string;
}

const NoteComponent: React.FC<NoteComponent> = ({noteId, note_content}) =>{
    const[note,updateNote]= useState(note_content);
    const {user, signOut} = useAuth();


    const logout = () =>{
        signOut();
    }
        
    const handleNoteChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
        updateNote(event.target.value);
    }; 

    const modifyNote = async () =>{
        if(user!== null){
            const{ userId,token } = user;
            const update_content = {userId: userId, noteId:noteId, update_content:note}
            const headers = {headers:{'Authorization': `Bearer ${token}`}};
            axios.post(`http://localhost:3000/note/update-note`,update_content, headers)
             .then(()=>{
                window.location.reload();
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
    }

    const deleteNote = async () =>{
        if(user!== null){
            const{ userId,token } = user;
            const headers = {headers:{'Authorization': `Bearer ${token}`}};
            console.log(`${userId} `)
            axios.delete(`http://localhost:3000/note/delete/${userId}/${noteId}`, headers)
             .then(()=>{
                window.location.reload();
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
    }

    return(
        <Card sx={{ minWidth: 275 }}>
        <CardContent>
                <DefaultTextField id={noteId.toString()} label={note} variant='standard' onChange={handleNoteChange} />
        </CardContent>
        <CardActions>
          <DefaultButton label='Update' onClick={modifyNote}/>
          <DefaultButton label='Delete' onClick={deleteNote}/>
        </CardActions>
      </Card>
    );
}

export default NoteComponent;