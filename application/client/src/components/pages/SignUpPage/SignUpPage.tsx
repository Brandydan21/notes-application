import React, {useState} from 'react';
import { DefaultTextField } from '../../common/TextField';
import { DefaultButton } from '../../common/Button';
import axios from 'axios';





const SignUpPage: React.FC = () => {
    const submit  = () =>{
        if (formData.confirmPassword !== formData.password){
            alert("error");
        }
        else{
            const signUpData = {"first_name":formData.firstName,"last_name":formData.lastName, "username":formData.username, "email":formData.email,"password":formData.password}
            axios.post('http://localhost:3000/user/sign-up', signUpData)
                .then((response)=> {
                    console.log(response);
                })
                .catch((error)=> alert(error));
           
        }  
    }
    

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
    });
    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.target;
        setFormData(prevState => {

           return {...prevState,[id]: value}
        });
    };
    
    return (

    <div>
        <DefaultTextField id='firstName' label='First Name' variant='standard' onChange={handleChange} />
        <DefaultTextField id='lastName' label='Last Name' variant='standard' onChange={handleChange}/>
        <DefaultTextField id='email' label='Email' variant='standard' onChange={handleChange} />
        <DefaultTextField id='username' label='Username' variant='standard' onChange={handleChange} />
        <DefaultTextField id='password' label='Password' variant='standard' onChange={handleChange} type='password'/>
        <DefaultTextField id='confirmPassword' label='Confirm Password' variant='standard' onChange={handleChange} type='password'/>
        <DefaultButton label='Submit' onClick={submit}/>
    </div>
  );
};

export default SignUpPage;