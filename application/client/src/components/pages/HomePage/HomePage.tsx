import React, { useState } from 'react';
import {useAuth} from '../../../context/AuthContext'
import { DefaultButton } from '../../common/Button';
import { DefaultTextField } from '../../common/TextField';
import { LoginPage } from '../../layout/Login';
import axios, { AxiosError} from 'axios';
import { ErrorResponse } from '../../../types';
import Contents from '../../layout/Contents/Contents';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import UserButton from '../../common/UserButton/UserButton';
import TextareaAutosize from '@mui/material/TextareaAutosize';




const HomePage: React.FC = () => {


  const {user, signOut } = useAuth();
  
  const [noteData, SetNoteData] = useState({
    note:''
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    SetNoteData(prevState => {

       return {...prevState,[id]: value}
    });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
        setSelectedFile(event.target.files[0]);
    }
};


  const logout = () =>{
    signOut();
  }
  
  const submitNote = () =>{        
    if(user!== null){
      const{ userId,email,first_name,last_name,username,token } = user;
      if (noteData.note !== ''){

        const formData = new FormData();
        formData.append('note_content', noteData.note);
        formData.append('userId', userId);
        if(selectedFile){
          formData.append('image', selectedFile);
        }

        const headers = {headers:{'Authorization': `Bearer ${token}`}};
        axios.post(`http://localhost:3000/note/add-note/${userId}`,formData,headers)
        .then(()=>{
          window.location.reload();
          alert('success')
        }).catch((error:AxiosError<ErrorResponse>)=>
          {
            if (error.response && error.response.data){
              alert(error.response.data.error);
            } else {
              alert('An unexpected error occurred');
            }
          });
      }
    }else{
      logout()
      window.location.reload();
    }
  }


if(user !== null){

  return(
      <div>
         
      <Grid container justifyContent="flex-end">
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', p:3}}>
        <UserButton user={user} logout={logout}></UserButton>
      </Box>
       
        </Grid>
        <Grid container  justifyContent="center" alignItems="center">
        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', p:2 }}>
          <Typography>New Note</Typography>
        </Box>
        </Grid>
        <Grid container  justifyContent="center" alignItems="center">
        <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '800px',  // Set the desired width
          gap: 1, p:1 // Add spacing between items
        }}
      >
        <TextField
          id="note"
          label="Note Contents"
          variant='outlined'
          onChange={handleInputChange}
          multiline
          rows={7}
        />
        <div>
        <input type="file" id="image" name="image" onChange={handleFileChange}/>
        </div>
       
        </Box>
        </Grid>
        <Grid container  justifyContent="center" alignItems="center">
        <Box sx ={{display: 'flex',
          flexDirection: 'column',
          width: '785px',  // Set the desired width
          gap: 1}}>
        <DefaultButton label='Add Note' onClick={submitNote}/><br/>
        </Box>
        </Grid>

          <br/><br/>
          <Divider sx={{ borderBottomWidth: '3px' }} />
          
          <Contents></Contents>
      </div>
      

  );
}else{
  return (
      <div>
        <Container>
        <Box>
          <LoginPage></LoginPage>
        </Box>
        </Container>
      </div>
      );
  }
};

export default HomePage;