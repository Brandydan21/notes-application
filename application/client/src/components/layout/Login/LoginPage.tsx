import React, {useState} from 'react';
import { DefaultTextField } from '../../common/TextField';
import { DefaultButton } from '../../common/Button';
import axios, {AxiosResponse, AxiosError} from 'axios';
import { ErrorResponse,User, signInData} from '../../../types'
import {useAuth} from '../../../context/AuthContext'
import { useNavigate } from 'react-router-dom';


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
                    alert(`${key} cannot be empty`);
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
                <DefaultTextField id='email_username' label='Email or Username' variant='standard' onChange={handleInputChange} />
                <DefaultTextField id='password' label='Password' variant='standard' onChange={handleInputChange} type='password'/>
                <DefaultButton label='Log In' onClick={submitLogin}/>
                <DefaultButton label='Sign Up' onClick={navToSignUp}/>


            </div>
            );
    }
};

export default LoginPage;