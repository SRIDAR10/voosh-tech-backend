# Voosh Tech Backend

## Project Overview

Voosh Tech Backend is the server-side application designed to handle the backend operations for Voosh Food Tech. It provides APIs for managing tasks, including adding, updating, and removing tasks.

## Table of Contents

- [Getting Started](#getting-started)
- [Scripts](#scripts)
- [Dependencies](#dependencies)
- [DevDependencies](#devdependencies)
- [API Endpoints](#api-endpoints)

## Getting Started

To get started with the project, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/SRIDAR10/voosh-tech-be.git
   cd voosh-tech-be


2. **Install depedencies**
    npm install

3.  **Start the development server:**
    node app.js

## **Scripts**

1. dev: Starts the development server.
2. build: Builds the project.
3. start: Starts the production server.

1. npm run dev
2. npm run build
3. npm run lint
4. npm run preview
 
## **Dependencies**

1. bcrypt: ^5.1.1
2. bcryptjs: ^2.4.3    
3. body-parser: ^1.20.2
4. cors: ^2.8.5
5. crypto: ^1.0.1
6. dotenv: ^16.0.3
7. express: ^4.18.2
8. helmet: ^7.0.0
9. http-status: ^1.6.2
10. jsonwebtoken: ^9.0.2
11. morgan: ^1.10.0
12. passport: ^0.7.0
13. passport-google-oauth20: ^2.0.0
14. passport-local: ^1.0.0  
15. passport-oauth2: ^1.8.0
16. sequelize: ^6.37.3
17. winston: ^3.9.0

## **Api Endpoints**   
    
Auth Routes
-----------
1. /login
2. /signup
3. /logout
4. /google
5. /google/callback
     
Dashboard Routes
---------------

1. /get-all-tasks
2. /add-task
3. /update-task
4. /update-status
5. /delete-task/:id
