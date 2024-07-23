import React, {useState} from 'react';
import { DefaultTextField } from '../../common/TextField';
import { DefaultButton } from '../../common/Button';
import axios, {AxiosResponse, AxiosError} from 'axios';
import { ErrorResponse,User, signInData} from '../../../types'
import {useAuth} from '../../../context/AuthContext'
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

import {Paper} from'@mui/material';

const LoginPage: React.FC = () => {
    const navigate =useNavigate();
    const { user, signIn, signOut } = useAuth();

    const [formData, setFormData] = useState({
        email_username: '',
        password: '',
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.target;
        setFormData(prevState => {

           return {...prevState,[id]: value}
        });
    };

    const submitLogin  = () =>{
        for (const key in formData) {
            if (formData.hasOwnProperty(key)) {
                if (formData[key as keyof typeof formData].trim() === "") {
                    alert(`Fields can not be empty`);
                    return;
                }
            
            }
        }
        const loginData: signInData = {"email_username":formData.email_username,"password":formData.password};
        axios.post('http://localhost:3000/user/login', loginData)
            .then((response: AxiosResponse<User> )=> {
                const user: User = response.data;
                signIn(user);
                window.location.reload();
            })
            .catch((error: AxiosError<ErrorResponse>)=> {
                if (error.response && error.response.data) {
                    alert(error.response.data.error);
                    
                } else {
                    alert('An unexpected error occurred');
                }
            });
        
    }
    const navToSignUp = () =>{
        navigate('/sign-up');
    }
    
    const logout = () =>{
        signOut();
    }
    
    if(user !== null){
        return(
            <div>
                <div>{user.first_name}</div>
                <div>{user.token}</div>
                <div>{user.userId}</div>
                <DefaultButton label='log out' onClick={logout}/>
            </div>

        );
    }
    else{
        return (
            <div>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                flexDirection:'column' }}>
            
                    <Typography sx={{p:3}}variant="h3">Notes</Typography>
                    <Box sx={{p:3, display: 'flex', flexDirection:'column', gap: 1,}}>
                    <DefaultTextField id='email_username' label='Email or Username' variant='outlined' onChange={handleInputChange} value={formData.email_username}/>

                    <DefaultTextField id='password' label='Password' variant='outlined' onChange={handleInputChange} type='password' value={formData.password}/>
        
                    <DefaultButton label='Log In' onClick={submitLogin}/>
                </Box>
                <Link href="http://localhost:3006/sign-up" variant="body2" sx={{p:2}}>
                  {"Sign Up"}
                </Link>
        
            </Box>
            </div>
            );
    }
};

export default LoginPage;