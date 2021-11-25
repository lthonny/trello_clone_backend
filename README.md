# Clone Trello backend
Repository frontend https://github.com/lthonny/trello_clone_frontend

### Core technology stack:

- Node + Express
- PostgreSQL
- JWT + PASSPORT

### ENV file:
Rename 
 
    .env.test.example to .env.test

    .env.test.example to .env.production
    
    .env.development.example to .env.development

### Testings
    npm run start:test

### 1) To download all project dependencies, white:
    
    npm ci

### 2) Prepare db(Postgresql) 

*POSTGRESQL*

   - `docker container run -d --name=trello -p 5431:5432 -e POSTGRES_PASSWORD=secret -e PGDATA=/pgdata -v [PATH TO]:/pgdata postgres`
 
   **[PATH TO]** - the path where you created the folder to store the container

   - `npm run db:create` create a database inside container and tables

### 3) Run npm start

    npm run start
    
    
### 🤝 Connect with me:

[<img alt="thonny | telegram" src="https://img.shields.io/badge/telegram-4680C2.svg?&style=for-the-badge&logo=telegram&logoColor=fff" />][telegram]
[<img alt="thonny | Instagram" src="https://img.shields.io/badge/instagram-E4405F.svg?&style=for-the-badge&logo=instagram&logoColor=fff" />][instagram]
[<img alt="thonny | VK" src="https://img.shields.io/badge/vk-4680C2.svg?&style=for-the-badge&logo=vk&logoColor=fff" />][vk]

[vk]: https://vk.com/thonny_v
[telegram]: https://t.me/thonnyDev
[instagram]: https://www.instagram.com/_th_vasiliy_/
