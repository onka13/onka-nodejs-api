## User Module

This module contains mobile app processes.

### Middleware

> src/api/middlewares/mobileToken

- Middleware for mobile device authentication.
- Reads token from 'token' parameter in request header.
- Validates token then if expire an error response will be send. (-20: NewToken)
- If token is live pass `AuthMobileData` to the Request object then go to next request handler. 
- This token creates by `mobile/device/register`

```
Route: ...
Header: { token: "TOKEN" }
Method: ...
```

### Register Mobile Device

```
Route: /mobile/device/register
Method: POST
Params: 
    { 
        appId: Application id
        deviceId: Device unique id
        osVersion: device os version
        appVersion: app version installed in device
        brand?: device brand
        model?: device model
        osType: device os
        registerKey: defined key in DeviceRegisterEntity. empty for first call    
    }
Response: 
    {
        success,
        code,
        value: {
            token, registerKey, registerId
        }
    }
```    