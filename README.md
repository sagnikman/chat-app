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
        NODE_ENV=<database environment>
    ```

 - go inside the `src` folder and execute the following command:
    ```
      npx sequelize init
    ```
 - By executing the above command you will get migrations and seeders folder along with a config.json inside the config folder. 
 - If you're setting up your development environment, then write the username of your db, password of your db and in dialect mention the db you are using for ex: mysql, mariadb etc
 - If you're setting up test or prod environment, make sure you also replace the host with the hosted db url.

 - To run the server execute
 ```
 npm run dev
 ```


# API Documentation

**Host Name**: https://todolistapis.fly.dev/

## Test API

**Method** : `GET`

**URL** : `/api/v1/info`

**Auth Required** : NO

**cURL**
```bash
curl --location 'https://todolistapis.fly.dev/api/v1/info'
```

### Success Response

**Code** : `200 OK`

**Example**

```json
{
    "success": true,
    "message": "API is live",
    "error": {},
    "data": {}
}
```

## Create User

**Method** : `POST`

**URL** : `/api/v1/user/signup`

**Auth Required** : No

**cURL**
```bash
curl --location 'https://todolistapis.fly.dev/api/v1/user/signup' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "abcd123@amail.com",
    "password": "417883abc"
}'
```

### Success Response

**Code** : `201 Created`

**Example**


```json
{
    "success": true,
    "message": "Successfully created an user",
    "data": {
        "id": 1,
        "email": "abcd123@amail.com",
        "password": "$2b$10$TStbR7fZJUPFOy/HV7rCAut04kkN4qqZTfG2KCIjkRoH6Hz4sap72",
        "updatedAt": "2023-08-16T15:36:03.355Z",
        "createdAt": "2023-08-16T15:36:03.355Z"
    },
    "error": {}
}
```

## Sign In

**Method** : `POST`

**URL** : `/api/v1/user/signin`

**Auth Required** : No

**cURL**
```bash
curl --location 'https://todolistapis.fly.dev/api/v1/user/signin' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'email=abcd123@amail.com' \
--data-urlencode 'password=417883abc'
```

### Success Response

**Code** : `200 OK`

**Example**


```json
{
    "success": true,
    "message": "Successfully signed in",
    "data": "eyJqbGcjOiJIUzI1NiIsInR4cCI6IkpXBKJ9.eyJpZCI6MQwiZW1huWwiOiBhYmMzQGFtYWlsLmNvbSIsImlhdCI6MTY5MjIwMDE4MCwiZXhwIjoxNjkyMjA3MzgwfQ.HlTw-fYM9h-1SkX61yvK7BuSNRj7iIpSfjnQDYSD7fI",
    "error": {}
}
```


## Create Todo

**Method** : `POST`

**URL** : `/api/v1/todos`

**Auth Required** : Yes

**cURL**
```bash
curl --location 'https://todolistapis.fly.dev/api/v1/todos' \
--header 'Authorization: Bearer <your_token>' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'task=task' \
--data-urlencode 'description=description'
```

### Success Response

**Code** : `201 Created`

**Example**


```json
{
    "success": true,
    "message": "Successfully created a todo",
    "data": {
        "id": 4,
        "task": "task1",
        "description": "this is description for task1",
        "updatedAt": "2023-08-16T15:52:23.409Z",
        "createdAt": "2023-08-16T15:52:23.409Z"
    },
    "error": {}
}
```

## Get all Todos

**Method** : `GET`

**URL** : `/api/v1/todos`

**Auth Required** : Yes

**cURL**
```bash
curl --location 'https://todolistapis.fly.dev/api/v1/todos' \
--header 'Authorization: Bearer <your_token>'
```

### Success Response

**Code** : `200 OK`

**Example**


```json
{
    "success": true,
    "message": "Successfully got all todos",
    "data": [
        {
            "id": 1,
            "task": "task1",
            "description": "",
            "completed": false,
            "createdAt": "2023-08-16T15:37:00.000Z",
            "updatedAt": "2023-08-16T15:37:00.000Z"
        },
        {
            "id": 2,
            "task": "task2",
            "description": "this is task 2",
            "completed": false,
            "createdAt": "2023-08-16T15:38:28.000Z",
            "updatedAt": "2023-08-16T15:38:28.000Z"
        }
    ],
    "error": {}
}
```

## Get Todo by id

**Method** : `GET`

**URL** : `/api/v1/todos/<id>`

**Auth Required** : Yes

**cURL**
```bash
curl --location 'https://todolistapis.fly.dev/api/v1/todos/2' \
--header 'Authorization: Bearer <your_token>'
```

### Success Response

**Code** : `200 OK`

**Example**


```json
{
    "success": true,
    "message": "Successfully completed the request",
    "data": {
        "id": 2,
        "task": "task2",
        "description": "this is task 2",
        "completed": false,
        "createdAt": "2023-08-16T15:38:28.000Z",
        "updatedAt": "2023-08-16T15:38:28.000Z"
    },
    "error": {}
}
```

## Update Todo

**Method** : `PUT`

**URL** : `/api/v1/todos/<id>`

**Auth Required** : Yes

**cURL**
```bash
curl --location --request PUT 'https://todolistapis.fly.dev/api/v1/todos/2' \
--header 'Authorization: Bearer <your_token>' \
--header 'Content-Type: application/json' \
--data '{
    "task": "task 2 updated",
    "description": "description updated"
}'
```

### Success Response

**Code** : `200 OK`

**Example**


```json
{
    "success": true,
    "message": "Successfully updated the todo",
    "data": [
        1
    ],
    "error": {}
}
```

## Toggle completed attribute of todo

**Method** : `PATCH`

**URL** : `/api/v1/todos/<id>`

**Auth Required** : Yes

**cURL**
```bash
curl --location --request PATCH 'https://todolistapis.fly.dev/api/v1/todos/5' \
--header 'Authorization: Bearer <your_token>'
```

### Success Response

**Code** : `200 OK`

**Example**


```json
{
    "success": true,
    "message": "Successfully updated the completed attribute of todo",
    "data": [
        1
    ],
    "error": {}
}
```