# MERN-THINKBOARD

A simple note-taking application built with the MERN stack.

## Features

* Create, read, update, and delete notes
* User authentication
* Responsive design

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

* Node.js
* npm

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/your_username_/MERN-THINKBOARD.git
   ```
2. Install backend dependencies
   ```sh
   cd backend
   npm install
   ```
3. Create a `.env` file in the `backend` directory and add the following environment variables:
   ```
   MONGO_URI=
   JWT_SECRET=
   ```
   You can use the `.env.example` file as a template.

4. Install frontend dependencies
   ```sh
   cd ../frontend
   npm install
   ```

### Running the application

1. Start the backend server
   ```sh
   cd backend
   npm run dev
   ```
2. Start the frontend development server
   ```sh
   cd ../frontend
   npm run dev
   ```

## Available Scripts

### Backend

* `npm start`: Starts the server in production mode.
* `npm run dev`: Starts the server in development mode with nodemon.
* `npm run build:frontend`: Builds the frontend application.

### Frontend

* `npm run dev`: Starts the development server.
* `npm run build`: Builds the application for production.
* `npm run lint`: Lints the code.
* `npm run preview`: Previews the production build.

## Technologies Used

* MongoDB
* Express.js
* React
* Node.js
* Redux
* JWT
* bcryptjs
* Mongoose
* Vite

## API Endpoints

### Users

* `POST /api/users/signup`: Register a new user.
* `POST /api/users/login`: Authenticate a user and get a token.

### Notes

* `GET /api/notes`: Get all notes for the logged-in user.
* `POST /api/notes`: Create a new note.
* `GET /api/notes/:id`: Get a specific note by its ID.
* `PUT /api/notes/:id`: Update a specific note by its ID.
* `DELETE /api/notes/:id`: Delete a specific note by its ID.

## Deployment

This application can be deployed on Render. You can follow the official Render documentation to deploy the application.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
