import React, {useState} from 'react';
import { DefaultTextField } from '../../common/TextField';
import { DefaultButton } from '../../common/Button';





const SignUpPage: React.FC = () => {
    const submit  = () =>{
        if (formData.confirmPassword != formData.password){
            alert("error");
        }
        else{
           alert("works");
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
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
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