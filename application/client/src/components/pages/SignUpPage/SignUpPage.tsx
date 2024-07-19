import React, {useState,useEffect} from 'react';
import { DefaultTextField } from '../../common/TextField';
import { DefaultButton } from '../../common/Button';
import axios, {AxiosResponse, AxiosError} from 'axios';
import {SignUpData, ErrorResponse,User} from '../../../types'
import {useAuth} from '../../../context/AuthContext'
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

const SignUpPage: React.FC = () => {

    const { user, signIn, signOut } = useAuth();
    const navigate = useNavigate(); // Ensure useNavigate is correctly imported and used
    
    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
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
                    alert(`${key} cannot be empty`);
                    return;
                }
            
            }
        }
        
        if (formData.confirmPassword !== formData.password){
            alert("Passwords are not the same");
            setFormData(prevState => ({
                ...prevState,
                password: '',
                confirmPassword: ''
            }));
        }
        else{
            const signUpData: SignUpData = {"first_name":formData.firstName,"last_name":formData.lastName, "username":formData.username, "email":formData.email,"password":formData.password}
            axios.post('http://localhost:3000/user/sign-up', signUpData)
                .then((response: AxiosResponse<User> )=> {
                    const created_user: User = response.data;
                    signIn(created_user);
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
    }
    const navToLogin = () =>{
        navigate('/');
    }
    
    const logout = () =>{
        signOut();
    }
    
   
    return (
        <div>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                flexDirection:'column' }}>
            <Typography sx={{p:3}}variant="h3">Sign Up</Typography>
            <Box sx={{p:3, display: 'flex', flexDirection:'column', gap: 1,}}>

            <DefaultTextField id='firstName' label='First Name' variant='outlined' onChange={handleInputChange} />
            <DefaultTextField id='lastName' label='Last Name' variant='outlined' onChange={handleInputChange}/>
            <DefaultTextField id='email' label='Email' variant='outlined' onChange={handleInputChange} />
            <DefaultTextField id='username' label='Username' variant='outlined' onChange={handleInputChange} />
            <DefaultTextField id='password' label='Password' variant='outlined' onChange={handleInputChange} type='password'/>
            <DefaultTextField id='confirmPassword' label='Confirm Password' variant='outlined' onChange={handleInputChange} type='password'/>
            <DefaultButton label='Sign Up' onClick={submitLogin}/>
            </Box>
            <Link href="http://localhost:3006/" variant="body2" sx={{p:2}}>
                  {"Login"}
                </Link>
            </Box>
        </div>
        );
    
};

export default SignUpPage;