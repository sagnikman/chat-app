## Project Details
Real time Chat Application made with Node.js, MongoDb, React and Socket.io.

![Description of GIF](./assets/screen-recording-real-chat.gif)

## Features

- **User Authentication**: Users can sign up and log in to the chat application.

- **JWT Token**: Secure authentication using JSON Web Tokens.

- **Online Status**: Real-time checking of user online status using Socket.io.

- **Real-Time Messaging**: Send and receive messages in real time.

- **Notifications**: Receive notifications sound for new messages.

- **Search**: Search for a particular user within the application.

- **Auto-Scroll**: Automatically scroll to the latest message in the chat view.


### Setup the project

 - Clone this project from github and open it in your favorite text editor. 
 - Build the project using this command
  ```
  npm run build
  ```
 - In the root directory create a `.env` file and add the following environment variables
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
 npm run start
 ```
