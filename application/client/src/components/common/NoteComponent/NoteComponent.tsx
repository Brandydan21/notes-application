import React, { useState } from "react";
import Box from '@mui/material/Box';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { DefaultTextField } from '../TextField';
import { DefaultButton } from '../Button';
import { useAuth } from "../../../context/AuthContext";
import axios, {AxiosResponse, AxiosError} from 'axios';
import { ErrorResponse } from "../../../types";
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';

import UpgradeIcon from '@mui/icons-material/Upgrade';


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
        <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '300px', // Set the desired height
          width: '800px',  // Set the desired width
          gap: 1, // Add spacing between items
        }}
      >
        <TextField
          id={noteId.toString()}
          label={note}
          variant='outlined'
          onChange={handleNoteChange}
          multiline
          rows={9}
        />
        <Box sx={{display: 'flex', gap:2,}}>
        <DefaultButton
          label='Update'
          onClick={modifyNote}
          // Make the button expand to fill available space
        />
        <DefaultButton
          label='Delete'
          onClick={deleteNote}
        // Make the button expand to fill available space
        />
        </Box>
      <Divider />
      </Box>
    );
}

export default NoteComponent;