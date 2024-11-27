# Task Manager

A web application to manage your daily tasks, allowing user registration, login, and personal task management.

## Features

- User registration and login.
- Create, edit, delete, and view tasks.
- Filter and search tasks.
- User-friendly interface.

## Technologies

- **Frontend:** React, Axios, React Router
- **Backend:** Node.js, Express, MongoDB
- **Authentication:** JSON Web Tokens (JWT)

## Aditionals

- This project uses GitHub Actions to automate workflows

## Installation

### Backend

Controllers: Contain the business logic.
Models: Define the data structure (MongoDB schema).
Middlewares: Intercept requests for validations, authentications, etc.
Routes: Define the routes and which controller will handle them.

backend/
│
├── controllers/
│   ├── taskController.js
│   ├── taskConfigController.js
│   └── userController.js
│
├── models/
│   ├── taskConfig.js
│   ├── task.js
│   └── user.js
│
├── middlewares/
│   └── authMiddleware.js
│
├── routes/
│   ├── taskRoutes.js
│   ├── taskConfigRoutes.js
│   ├── testRoutes.js
│   └── userRoutes.js
│
├── scripts/
│   └── initializeData.js
│
├── utils/
│   └── helpers.js
│
├── index.js 
└── package.json


1. **Clone the backend repository:**  
   git clone https://github.com/pamerq/zenith.git
   cd zenith

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

