# nodejs-ts-api-boilerplate

NodeJS API server boilerplate. 

Provides a good start for large scale projects and also for mock APIs.
Project architecture considers software concepts such as DDD, TDD, Solid etc.
Aims to provide microservice structure that includes independent modules.
Contains user and mobile modules basicly for now.

***

- Express: web framework
- casual: to generate fake data
- crypto-js: to encrypt password
- jsonwebtoken: to create tokens
- lowdb: to store data as json
- moment: to manipulating dates 

## Installation

Clone or download then use npm or yarn.

```bash
git clone https://github.com/onka13/nodejs-ts-api-boilerplate.git
cd nodejs-ts-api-boilerplate
yarn
yarn start
```

# Structure of the project

- `/docs` - documentation
- `/scripts` - scripts to manipulate project
- `/src` - contains the source code
    - `/src/api/routes` - contains all routes
    - `/src/api/middlewares` - contains all middlewares
    - `/src/business` - business logics
    - `/src/domain` - models 
    - `/src/infra` - some useful functions 
    - `/src/modulelibs` - contains all modules 
        - `/src/modulelibs/common` - shared module  
        - `/src/modulelibs/mobile` - module for mobile apps  
        - `/src/modulelibs/user` - user module  
            - `/src/modulelibs/entitites` - entities for this module
            - `/src/modulelibs/enums` - enums for this module
            - `/src/modulelibs/models` - models for this module
            - `/src/modulelibs/repositories` - repository components to access data
            - `/src/modulelibs/services` - business logics
    - `/src/tests` - unit tests
    - `/src/types` - declare extra types

## Flow

> Middlewares -> Controller -> Service -> Repository -> Data

(middlewares/authUser) -> (routes/user/user) -> (moduleLibs/user/services/UserService) -> (moduleLibs/user/repositories/UserRepository) -> CRUD data operations

- Middleware validates all requests.
- Controllers are routes. (No businesslogic here!)
- Services are business logics in module. (No data access here!)
- Repositories are data layers. Manipulate data here. 

## Scaling Project

Check temp folder samples in `routes` and `moduleLibs` for creating new module. (TODO: scripts will be added for creating new modules) 

## Modules

- [Mobile Module](https://github.com/onka13/nodejs-ts-api-boilerplate/tree/master/docs/module-mobile.md)
- [User Module](https://github.com/onka13/nodejs-ts-api-boilerplate/tree/master/docs/module-user.md)

## Todo

- [ ] Create documentation
- [ ] Add IOC
- [ ] Add logging
- [ ] Add ORM
- [ ] Add MongoDB helpers
- [ ] Add ElasticSearch helpers
- [ ] Add Redis helpers
- [ ] Add Memcached helpers
- [ ] Add more test

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://github.com/onka13/nodejs-ts-api-boilerplate/blob/master/LICENSE)