
# Notes Application

This is a notes application built using Node.js and Express.js for the backend, React.js for the frontend and MySQL for the database.

This application allows users to create accounts and with their user accounts create, update, read and delete notes. They can also attach files to their notes. 


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
- This endpoint is used to add a new note to a logged in user's account. A note will contain information 
