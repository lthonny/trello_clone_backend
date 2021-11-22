# Trello-backend
Coursework at Inspirit (back-end).

### ENV file:

Rename 
    
    .env.example to .env
    
    .env.test.example to .env.test

    .env.test.example to .env.production
    
    .env.development.example to .env.development

### Testings

    `npm run test`

<!--  
In order to run e2e tests that are written on the frontend, you need to run:

1) we raise the database in a docker container: ```npm run setup_db_testing```
2) we create a database, do the migration and fill the database: ```npm run create_db_testing```
3) run the backend in testing mode: ```npm run test```
4) then go to front-end repository: ```https://github.com/lthonny/Trello-frontend```
-->

## 1) To download all project dependencies, white:
    
    `npm ci`

## 2) Prepare db(Postgresql) 

*POSTGRESQL*

   - `docker container run -d --name=trello -p 5431:5432 -e POSTGRES_PASSWORD=secret -e PGDATA=/pgdata -v [PATH TO]:/pgdata postgres`
 
   **[PATH TO]** - the path where you created the folder to store the container

   - `npm run create_db` create a database inside container and tables

## 3) Run npm start

    `npm run start`
