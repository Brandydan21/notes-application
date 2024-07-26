
# Notes Application

This is a notes application built using Node.js and Express.js for the backend, React.js for the frontend and MySQL for the database.

This application allows users to create accounts and with their user accounts create, update, read and delete notes. They can also attach files to their notes. 
# Set-up
## Server Set-up (DEV)
```
$ mkdir notes-application
$ cd notes-application 
```
Create a directory for the repository
```
$ git clone https://github.com/Brandydan21/notes-application.git
```
Clone the the repository

```
$ cd application 
$ cd server
```
Change to server directory 
```
$ npm install
```
Install all the dependencies required to run start the application
```
$   echo 'DATABASE_NAME="notesdb"
    DATABASE_USERNAME={your_database_username}
    DATABASE_PASSWORD={your_database_password}
    HOST="localhost"
    SYNC_DB="TRUE"
    SECRET_KEY={your_secret_key} > .env

```
Before creating a .env file, make sure you have MySQL set up with a database named notesdb, then add appropriate fields to the environment variables. For first time starting the application make sure SYNC_DB is TRUE to sync the database schema / tables to your database. Then change it to FALSE after. 
```
$ npm run start:dev
```
Start the server in development 

## Client / frontend Set-up (DEV)
```
$ cd application 
$ cd client
```
Change to client directory
```
$ npm install 
```
Install all required dependencies 
```
$ npm run start 
```
Start the client-side application in development 

## Containerisation Set-up

To set-up the application as containers, ensure you have podman is installed and running.

The application's server application, client application and database are seperated into 3 seperate containers contained inside a podman pod.

To set this up there are 3 shell scripts that must be ran to create the pod, the database container, client application container and the server application container.
```
$ mkdir notes-application
$ cd notes-application 
```
Create a directory for the repository

```
$ git clone https://github.com/Brandydan21/notes-application.git
$ cd application 
```
Clone the repository and change to application directory

```
$ sh set_up_pod_and_db.sh 
```
Run the shell script. This shell script will create the pod and the database container. Wait for the prompt indicating that the database container running before continuing.

```
$ cd server
$ sh set_up_server.sh
```
Change to server directory then run the shell script. This shell script will create the server application container inside of our pod. Wait for the prompt indicating the container is running before continuing.
```
$ cd ..
$ cd client 
$ sh set_up_frontend.sh
```
Go back a directory, change to client directory then run the shell script. This script will create the client side application inside of our pod.

## Accessing the application
### Client side application / Frontend  
```
http://localhost:3006/
```
The client side application is listening on port 3006 and can be accessed with the above address.

```
http://localhost:3000/
```
The server side application is listening on port 3000 and can be accessed with the above address.

```
http://localhost:3306/
```
The Database is listening on port 3306 and can be accessed with the address above.

# Server

For the backend of this application Express.js is used to handle API requests and we are using JWT for authentication of users.

## API endpoints:
### User endpoints:
#### Endpoint : http://localhost:3000/user/sign-up
- This endpoint is used to create a new user. It will check if the user is using an email or a username that already exists in the database, so users must provide an email and an username that is unique. The endpoint will return a the newly created user and a JWT Token, loggining the user in.

- Method: `PUT`

- Request body:
```
{
    "first_name": "John",
    "last_name" Smith", 
    "username": "john_smith1"
    "email": "johnsmit@gmail.com",
    "password": "1234"
}
```
- Response body:
```
{
    "first_name": "John",
    "last_name" Smith", 
    "username": "john_smith1"
    "email": "johnsmit@gmail.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMiIsImVtYWlsIjoiYnJhbmR5ZGFuMjAwMjNAZ21haWwuY29tIiwidXNlcm5hbWUiOiJiZGFuIiwiZmlyc3RfbmFtZSI6IkJyYW5keSIsImxhc3RfbmFtZSI6IkRhbiIsImlhdCI6MTcyMTc5MTE2NSwiZXhwIjoxNzIxNzk0NzY1fQ.QbGmMusW_7N6Wc0mPYE67Tm-dt4YBxz0HNG0EntKhwk"
    
}
```


#### Endpoint : http://localhost:3000/user/login
- This endpoint is used for login of an already existing user. The endpoint will check if a combination of username and password or email and password exists in the database to allow for login. The endpoint will return a user and a JWT Token if an user is found, otherwise an error response.

- Method: `PUT`

- Request body:
```
{
    "email_username":"john_smit1", 
    "password":"123"
}
```

- Response body:
```
{
    "first_name": "John",
    "last_name" Smith", 
    "username": "john_smith1"
    "email": "johnsmit@gmail.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMiIsImVtYWlsIjoiYnJhbmR5ZGFuMjAwMjNAZ21haWwuY29tIiwidXNlcm5hbWUiOiJiZGFuIiwiZmlyc3RfbmFtZSI6IkJyYW5keSIsImxhc3RfbmFtZSI6IkRhbiIsImlhdCI6MTcyMTc5MTE2NSwiZXhwIjoxNzIxNzk0NzY1fQ.QbGmMusW_7N6Wc0mPYE67Tm-dt4YBxz0HNG0EntKhwk"
    
}
```
#### Endpoint : http://localhost:3000/user/refresh/{userId}

- This endpoint is used for refreshing an logged in user's JWT Token. When the user refreshes the webpage while logged in, they will send a request to refresh their token, returning a new refresh token and preventing the expiry of a token while the application is in use. This request requires a path variable {userId} which is the currently logged in user's userId and requires an Authorization header with the user's current JWT Token and will check if the token is still valid (not expired) and will return a new token and the current user if it is still valid and an error otherwise.

- Method: `GET`

- Request Header:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMiIsImVtYWlsIjoiYnJhbmR5ZGFuMjAwMjNAZ21haWwuY29tIiwidXNlcm5hbWUiOiJiZGFuIiwiZmlyc3RfbmFtZSI6IkJyYW5keSIsImxhc3RfbmFtZSI6IkRhbiIsImlhdCI6MTcyMTA4NzgwNCwiZXhwIjoxNzIxMDkxNDA0fQ.j2PFa5Uxo1X79U8cSLTQImYL5ZbnMuPTybpS8ABmyiY 
```
- Response Body:
```
{
    "first_name": "John",
    "last_name" Smith", 
    "username": "john_smith1"
    "email": "johnsmit@gmail.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMiIsImVtYWlsIjoiYnJhbmR5ZGFuMjAwMjNAZ21haWwuY29tIiwidXNlcm5hbWUiOiJiZGFuIiwiZmlyc3RfbmFtZSI6IkJyYW5keSIsImxhc3RfbmFtZSI6IkRhbiIsImlhdCI6MTcyMTc5MTE2NSwiZXhwIjoxNzIxNzk0NzY1fQ.QbGmMusW_7N6Wc0mPYE67Tm-dt4YBxz0HNG0EntKhwk"
    
}
```

### Note endpoints:
#### Endpoint : http://localhost:3000/note/add-note/{userId}
- This endpoint is used to add a new note to a logged in user's account. In order to create a note, the user must enter note contents (string), and must have a valid token. A file can also be attached to a note. The request should be a form data.

- Method: `POST`

- Request Header:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMiIsImVtYWlsIjoiYnJhbmR5ZGFuMjAwMjNAZ21haWwuY29tIiwidXNlcm5hbWUiOiJiZGFuIiwiZmlyc3RfbmFtZSI6IkJyYW5keSIsImxhc3RfbmFtZSI6IkRhbiIsImlhdCI6MTcyMTA4NzgwNCwiZXhwIjoxNzIxMDkxNDA0fQ.j2PFa5Uxo1X79U8cSLTQImYL5ZbnMuPTybpS8ABmyiY 
```

- Request Body: 
    -  form-data(userId: text, note_content: text,image: file | null):
```
userId: 12
note_content: note with file
image: file.png
```
- Response Body:
```
{
    note:{
        userId:"12",
        note_content:"note with file"
    }
    image:{
        path:"/uploads/file,png",
        userId:"12",
        noteId:"2"
    }
}
```
#### Endpoint : http://localhost:3000/note/{userId}
- This endpoint will fetch all notes belonging to an user. This endpoint requires the userId path variable as well as an authorization header to access the user's notes. It will return an array of notes belonging to an user.

- Method: `GET`

- Request Header:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMiIsImVtYWlsIjoiYnJhbmR5ZGFuMjAwMjNAZ21haWwuY29tIiwidXNlcm5hbWUiOiJiZGFuIiwiZmlyc3RfbmFtZSI6IkJyYW5keSIsImxhc3RfbmFtZSI6IkRhbiIsImlhdCI6MTcyMTA4NzgwNCwiZXhwIjoxNzIxMDkxNDA0fQ.j2PFa5Uxo1X79U8cSLTQImYL5ZbnMuPTybpS8ABmyiY 
```

- Response Body:
```
{
    note:[
        {   
            noteId: "3",
            userId:"12",
            note_content:"note with file"
        },
        {
            noteId: "4",
            userId:"13",
            note_content:"note 2 with file"
        } 
    ]
}
```

#### Endpoint : http://localhost:3000/note/images/{noteId}/{userId}
- This endpoint is used to get the files that belong to a note. It requires path variables noteId which is the id of the note and the userId which is the user id of the user who created the note. This endpoint requires a valid token to access its resources.

- Method: `GET`

- Request Header:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMiIsImVtYWlsIjoiYnJhbmR5ZGFuMjAwMjNAZ21haWwuY29tIiwidXNlcm5hbWUiOiJiZGFuIiwiZmlyc3RfbmFtZSI6IkJyYW5keSIsImxhc3RfbmFtZSI6IkRhbiIsImlhdCI6MTcyMTA4NzgwNCwiZXhwIjoxNzIxMDkxNDA0fQ.j2PFa5Uxo1X79U8cSLTQImYL5ZbnMuPTybpS8ABmyiY 
```

- Response Body:
```
    "path:[
        {
            "id": 2,
            "path": "/uploads/image.png"
            "userId": 12,
            "noteId": 3
        },
        {
            "id": 3,
            "path": "/uploads/image2.png"
            "userId": 12,
            "noteId": 3
        }
    ]
```

#### Endpoint : http://localhost:3000/note/update-note
- This endpoint is used to update an already existing note by changing its current contents. The endpoint requires token authentication to update an already existing note.

- Method: `GET`

- Request Header:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMiIsImVtYWlsIjoiYnJhbmR5ZGFuMjAwMjNAZ21haWwuY29tIiwidXNlcm5hbWUiOiJiZGFuIiwiZmlyc3RfbmFtZSI6IkJyYW5keSIsImxhc3RfbmFtZSI6IkRhbiIsImlhdCI6MTcyMTA4NzgwNCwiZXhwIjoxNzIxMDkxNDA0fQ.j2PFa5Uxo1X79U8cSLTQImYL5ZbnMuPTybpS8ABmyiY 
```

- Request Body:
```
    {
        "userId": "12",
        "noteId": "3", 
        "update_content": "new content"
    }

```

- Response Body:
```
    { 
        message: 'Note updated successfully', 
        note: {
            noteId: "3"
            userId:"12",
            note_content:"new content"
        }
    }
```

#### Endpoint : http://localhost:3000/note/delete/{userId}/{noteId}
- This endpoint is ued to delete a note belonging to an user. This endpoint requires path variables userId which is the user id of the creator of the note and the noteId which is the id of the note that is being deleted. This endpoint requires a valid token to acccess.

- Method: `DELETE`

- Request Header:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMiIsImVtYWlsIjoiYnJhbmR5ZGFuMjAwMjNAZ21haWwuY29tIiwidXNlcm5hbWUiOiJiZGFuIiwiZmlyc3RfbmFtZSI6IkJyYW5keSIsImxhc3RfbmFtZSI6IkRhbiIsImlhdCI6MTcyMTA4NzgwNCwiZXhwIjoxNzIxMDkxNDA0fQ.j2PFa5Uxo1X79U8cSLTQImYL5ZbnMuPTybpS8ABmyiY 
```

- Response Header:
```
{ 
    message: 'Note deleted successfully' 
}
```

### Authorization Middleware:
- This application contains endpoints that requires authenication to access. In order to authenticate an user this application uses JWT Tokens to validate users. The application contains middleware functions to generate and authenticate JWT Tokens.


#### Generate JWT Token

```
const generate_token = (user: User): string =>{

    return jwt.sign({userId: user.id.toString(), email: user.email, username: user.username, first_name:user.first_name,
        last_name: user.last_name}, SECRET_KEY, { expiresIn: '1h' });

}
```
Middleware function generate_token is called to generate a JWT Token endpoints to login, sign-up or refresh tokens are called. This function takes an user object as a parameter and uses jwt.sign to create a token based on the User object values and the SECRET_KEY. It will return a JWT Token and the endpoint will return the token to the user.

#### Authenticate JWT Token
```
const authenticate_token = (req:Request<{userId:string, noteId:string}>, res: Response, next: NextFunction) => {
    
    const authHeader = req.headers['authorization'];
    const current_userId = req.params.userId || req.body.userId;
    
    if(authHeader === undefined){
        return res.status(403).send({ message: 'No token provided!' });
    }

    const token = authHeader.split(' ')[1];
    jwt.verify(token, SECRET_KEY, (err,payload)=>{
        
        if(err){
            return res.status(403).send({ error: 'Invalid Token1' });
        }

        if(payload === undefined){
            return res.status(403).send({ error: 'Invalid Token2' });
   
        }
        const jpayload: JwtPayload = payload as JwtPayload;
        
        if(jpayload.userId.toString() !== current_userId.toString()){
            return res.status(403).send({ error: `Invalid Token3`});
        }
                
        next();
    });
}
```

The authenticate_token middleware function is used to validate a JWT token and is invoked before invoking a controller that requires authentication such as when enpoints to create a note and delete a note is called. This function requires a request and response parameter. The request can have either a userId path parameter or a userId in its request body, so it can authenticate that the user sending the request matches the userId in the JWT Token body. The function will verify the token is valid by decoding it with the secret key, check it is not expired and checks the userId sending the request matches the userId in the token body. If all is valid the controller function is invoked, else it return a error response.

### Storing of note files:
- When an user attaches a file to a note, to store this file we use Multer, a middleware for handling form-data in or requests. This allows us to upload files from the frontend to our server. This middleware is invoked when a request to create a new note is called, allowing for attached files to the request to be handled and stored.
```

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, '../../uploads'));
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    }
});

```
This multer configuration defines the destination of where uploaded files are stored as well as the name that the file will be stored as which is the current date and the file name.

```
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
```
To access our files we create a route to serve our static files which will be `http://localhost:3000/uploads/{file_name}`. The express.static function will serve the static file based on file_name which is stored in the upload directory.

# Client / Frontend 
For the frontend of the notes application, we are using React.js framework with MUI to create our styled components.

## Features:

1. User account creation and login to seperate user data.
2. Creation of persistant notes data under a user account.
3. Attach

## Application state
The notes app uses a context which stores information on the application's current state as well as contains functions to log users in, log users out and will refresh the current JWT Token if a user is logged in everytime a page is rendered / refreshed.

The application has 2 states: logged in and logged out. Logged means the user a valid user has been returned and stored. Logged out means a valid user has not been returned and stored in our context.

The auth context has 2 functions to clear and set the state of the app, the login function will set the state of the app to logged in by setting a user object as the current state, whereas the logout function will clear the state to null, and set the state to logged out. 

The refreshing of JWT Token occurs when the state is logged in and is done through a useEffect hook, which will be invoked everytime the page re-renders sending a request to the server to check the validity of the current token and returning a new token if the current token is valid, otherwise, logging the user out.

## Routes

### Homepage: http://localhost:3006/
- The homepage will render a login form if a user is not logged in. If a user is logged in then it will display the current notes the user has created and a text field to create a new note.

### Sign-up: http://localhost:3006/sign-up
- This page will render a sign-up form if a user is not logged in. If a user is logged in it we redirect the the home page.
ment of files to notes under a user account.

## Stack:
- Frontend: React, Typescript
- Styling: SCSS
- State Management: Context API
- Build Tool: Webpack used to bundling and building the React application
- HTTP Client: Axios 
- Other Frameworks: MUI 