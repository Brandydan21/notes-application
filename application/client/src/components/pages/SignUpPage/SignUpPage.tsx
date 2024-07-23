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
import TextField from '@mui/material/TextField';


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
    const [formError, setFormError] = useState({
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
    });

    /*const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.target;
        
        if(!event.target.validity.valid){
            setFormError(prevState => {
                return {...prevState,[id]: true}
             });
        }else{
            setFormError(prevState => {
                return {...prevState,[id]: false}
             });
        }

        setFormData(prevState => {
           return {...prevState,[id]: value}
        });
    };*/

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
        const { id, value } = event.target;
        if (value.trim() === '' ){
            setFormError(prevState => {
                return {...prevState,[id]: 'Can not be empty'}
             });
        }
        else if (!/^[A-Za-z ]*$/.test(value)){
            setFormError(prevState => {
                return {...prevState,[id]: 'Can only be letters and spaces'}
             });
        }else{
            setFormError(prevState => {
                return {...prevState,[id]: ''}
            });
        }

        setFormData(prevState => {
            return {...prevState,[id]: value}
        });

    }

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
        const { id, value } = event.target;
        if (value.trim() === '' ){
            setFormError(prevState => {
                return {...prevState,[id]: 'Can not be empty'}
             });
        }
        
        else if (!/^[A-Za-z0-9_]*$/.test(value)) {
            setFormError(prevState => {
                return {...prevState,[id]: 'Can only be letters, numbers and underscores'}
             });
        }else{
            setFormError(prevState => {
                return {...prevState,[id]: ''}
            });
        }

        setFormData(prevState => {
            return {...prevState,[id]: value}
        });

    }

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
        const { id, value } = event.target;
        if (value === '' ){
            setFormError(prevState => {
                return {...prevState,[id]: 'Can not be empty'}
             });
        }
        else if (!/^[A-Za-z0-9@$!%*?&]*$/.test(value)){
            setFormError(prevState => {
                return {...prevState,[id]: 'password can be only number, letter or special characters'}
             });
        }else{
            setFormError(prevState => {
                return {...prevState,[id]: ''}
            });
        }

        setFormData(prevState => {
            return {...prevState,[id]: value}
        });
    }

    const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
        const { id, value } = event.target;
        setFormData(prevState => {
            return {...prevState,[id]: value}
        });
        if (value !== formData.password ){
            setFormError(prevState => {
                return {...prevState,[id]: "Passwords don't match"}
             });
        }else{
            setFormError(prevState => {
                return {...prevState,[id]: ''}
            });
        }

       
    }

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
        const { id, value } = event.target;
        if (value.trim() === '' ){
            setFormError(prevState => {
                return {...prevState,[id]: 'Can not be empty'}
             });
        }
        else if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(value)){
            setFormError(prevState => {
                return {...prevState,[id]: 'Invalid email format'}
             });
        }else{
            setFormError(prevState => {
                return {...prevState,[id]: ''}
            });
        }

        setFormData(prevState => {
            return {...prevState,[id]: value}
        });


    }
   

    const submitLogin  = () =>{
        for (const key in formData) {
            if (formData.hasOwnProperty(key)) {
                if (formData[key as keyof typeof formData].trim() === "") {
                    alert(`Fields can not be empty`);
                    return;
                }
            }
        }
        
        for (const key in formError) {
            if (formData.hasOwnProperty(key)) {
                if (formError[key as keyof typeof formError].trim() !== '') {
                    alert(`Inputs are invalid`);
                    return;
                }
            }
        }

        if (formData.confirmPassword !== formData.password){
            setFormData(prevState => ({
                ...prevState,
                password: '',
                confirmPassword: ''
            }));
            alert("Passwords are not the same");
            
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
            <Box sx={{p:3, display: 'flex', flexDirection:'column', gap: 1, width:'20vw'}}>
            <TextField id='firstName' label='First Name' variant='outlined' onChange={handleNameChange} value={formData.firstName} error={formError.firstName !==''} 
            helperText={formError.firstName !=='' ? formError.firstName : ""}/>
            <TextField id='lastName' label='Last Name' variant='outlined' onChange={handleNameChange} value={formData.lastName} error={formError.lastName  !=='' } 
            helperText={formError.lastName !=='' ? formError.lastName : ""}/>
            <TextField  id='email' label='Email' variant='outlined' onChange={handleEmailChange} value={formData.email} error={formError.email !==''} 
             helperText={formError.email !=='' ? formError.email : ""}/>
            <TextField  id='username' label='Username' variant='outlined' onChange={handleUsernameChange}  value={formData.username} error={formError.username !==''} 
             helperText={formError.username !=='' ? formError.username : ""}/>
            <TextField  id='password' label='Password' variant='outlined' onChange={handlePasswordChange}  type='password' value={formData.password} error={formError.password !==''} 
             helperText={formError.password !=='' ? formError.password : ""}/>
              <TextField  id='confirmPassword' label='Confirm Password' variant='outlined' onChange={handleConfirmPasswordChange} type='password' value={formData.confirmPassword} error={formError.confirmPassword !==''} 
             helperText={formError.confirmPassword !=='' ? formError.confirmPassword : ""}/>
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