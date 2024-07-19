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
const HomePage: React.FC = () => {

  const {user, signOut } = useAuth();
  
  const [noteData, SetNoteData] = useState({
    note:''
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    SetNoteData(prevState => {

       return {...prevState,[id]: value}
    });
  };

  const logout = () =>{
    signOut();
  }
  
  const submitNote = () =>{        
    if(user!== null){
      const{ userId,email,first_name,last_name,username,token } = user;
      if (noteData.note !== ''){
        const new_note = {userId:userId, note_content:noteData.note};
        const headers = {headers:{'Authorization': `Bearer ${token}`}};
        axios.post('http://localhost:3000/note/add-note',new_note,headers)
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
          <p>name: {user.first_name} username:{user.username}</p>
          <DefaultTextField id="note" label='Note Contents' onChange={handleInputChange} ></DefaultTextField>
          <DefaultButton label='Add Note' onClick={submitNote}/><br/>
          <DefaultButton label='log out' onClick={logout}/>
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