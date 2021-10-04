# Trello-backend
Coursework at Inspirit (back-end).

### ENV file:

Rename 
    
    .env.example to .env
    
    .env.test.example to .env.test

    .env.test.example to .env.production
    
    .env.development.example to .env.development


## 1) To download all project dependencies, white:
    
    `npm ci`

## 2) Prepare db(Postgresql) 

*POSTGRESQL*

   - `docker container run -d --name=trello -p 5431:5432 -e POSTGRES_PASSWORD=secret -e PGDATA=/pgdata -v [PATH TO]:/pgdata postgres`
 
   **[PATH TO]** - the path where you created the folder to store the container

   - `npm run create_db` create a database inside container and tables

## 3) Run npm start

    `npm run start`