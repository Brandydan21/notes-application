import React, {useState} from 'react';
import { DefaultTextField } from '../../common/TextField';
import { DefaultButton } from '../../common/Button';
import axios, {AxiosResponse, AxiosError} from 'axios';
import {SignUpData, ErrorResponse,User} from '../../../types'
import {useAuth} from '../../../context/AuthContext'


const SignUpPage: React.FC = () => {
    const { user, signIn } = useAuth();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
    });



    const submitLogin  = () =>{
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
     
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.target;
        setFormData(prevState => {

           return {...prevState,[id]: value}
        });
    };
    if(user){
        return(
            <div>Logged in</div>
        );
    }

    return (
        <div>
            <DefaultTextField id='firstName' label='First Name' variant='standard' onChange={handleInputChange} />
            <DefaultTextField id='lastName' label='Last Name' variant='standard' onChange={handleInputChange}/>
            <DefaultTextField id='email' label='Email' variant='standard' onChange={handleInputChange} />
            <DefaultTextField id='username' label='Username' variant='standard' onChange={handleInputChange} />
            <DefaultTextField id='password' label='Password' variant='standard' onChange={handleInputChange} type='password'/>
            <DefaultTextField id='confirmPassword' label='Confirm Password' variant='standard' onChange={handleInputChange} type='password'/>
            <DefaultButton label='Submit' onClick={submitLogin}/>
        </div>
  );
};

export default SignUpPage;