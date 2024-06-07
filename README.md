### Project Details
This is a real time Chat Application made with Node.js, MongoDb, React and Socket.io. 

### Setup the project

 - Clone this project from github and open it in your favorite text editor. 
 - Go inside the folder path and execute the following command:
  ```
  npm install
  ```
 - In the root directory create a `.env` file and add the following env variables
    ```
        PORT=<port number of your choice>
        SALT_ROUNDS=<Number of salt rounds>
        JWT_SECRET=<your JWT secret key>
        JWT_EXPIRY=<set expiry for JWT Token>
        MONGODB_URI=<mongodb connection>
        NODE_ENV=<database environment>
    ```

 - To run the server execute
 ```
 npm run dev
 ```
