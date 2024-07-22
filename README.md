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

4. **Scripts**
    dev: Starts the development server.
    build: Builds the project.
    start: Starts the production server.

    npm run dev
    npm run build
    npm run lint
    npm run preview
 
 5. **Dependencies**
    bcrypt: ^5.1.1
    bcryptjs: ^2.4.3    
    body-parser: ^1.20.2
    cors: ^2.8.5
    crypto: ^1.0.1
    dotenv: ^16.0.3
    express: ^4.18.2
    helmet: ^7.0.0
    http-status: ^1.6.2
    jsonwebtoken: ^9.0.2
    morgan: ^1.10.0
    passport: ^0.7.0
    passport-google-oauth20: ^2.0.0
    passport-local: ^1.0.0  
    passport-oauth2: ^1.8.0
    sequelize: ^6.37.3
    winston: ^3.9.0

 6. **Api Endpoints**   
    
    Auth Routes
    -----------
    /login
    /signup
    /logout
    /google
    /google/callback
     
     Dashboard Routes
     ---------------

     /get-all-tasks
    /add-task
    /update-task
    /update-status
    /delete-task/:id
