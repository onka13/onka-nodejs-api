## User Module

This module contains user-based processes.

### Middleware

> src/api/middlewares/authUser

- Middleware for user authentication.
- Reads token from authorization in request header.
- Validates token then if expire an error response will be send. (-30: LoginUser)
- If token is live pass `UserTokenData` to the Request object then go to next request handler. 
- This token creates by `user/account/login` or `user/account/register`.

```
Route: ...
Header: { authorization: "Bearer TOKEN" }
Method: ...
```


### Login User
```
Route: /user/account/login
Method: POST
Params: { email, password }
Response: 
    {
        success,
        code,
        value: {
            userId, emailConfirmed, email, access_token, expires_in
        }
    }
```
### Register User
```
Route: /user/account/register
Method: POST
Params: { name, email, password }
Response: 
    {
        success,
        code,
        value: {
            userId, emailConfirmed, email, access_token, expires_in
        }
    }
```