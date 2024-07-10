interface UserSignUpDTO{
    first_name: string,
    last_name: string,
    username: string, 
    email: string, 
    password: string
};


interface UserLoginDTO{
    email_username:string;
    password:string;
}

export {UserLoginDTO, UserSignUpDTO}