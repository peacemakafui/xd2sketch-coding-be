# Awesome Project Build with TypeORM

Steps to run this project:

1. Clone repo 
2. Setup postgres on your local machine and make sure its active
3. Run `npm i` command to install all the necessary packages
4. Setup database settings inside `ormconfig.json` file with the database params that match your config.
5. run migration with `npm run typeorm migration:run` command
6. Run `npm start` command or `npm run dev` command to keep track of changes real time.
7. Once the app starts you can view the route http://localhost:port in the console, this is the route your endpionts would be defined on and the front end will connect to.
8. to ensure the communication between the backend and frontend make sure the frontend code is setup as well. go to https://github.com/peacemakafui/xd2sketch-coding-fe.git to see the frontend instructions
