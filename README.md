# How to Run the Project

## Prerequisites
- Node.js (npm)
- Yarn

## MongoDB Setup

1. Follow this tutorial: [MongoDB Setup Guide](https://youtu.be/O5cmLDVTgAs?si=CNNLtl9m7kX7GbFh) (watch between 2:01:08 and 2:03:00).
2. Copy the provided MongoDB connection string.

## Backend Setup

1. In the `backend/` directory, create a `.env` file with the following content:
    ```
    PORT=8000
    MONGO_URL=mongodb+srv://... (your connection string)
    ```
2. Install the required dependencies:
    ```console
    $ cd backend
    $ yarn
    ```
3. Start the backend server:
    ```console
    $ yarn start
    ```

## Frontend Setup

1. Install the required dependencies:
    ```console
    $ cd frontend
    $ yarn
    ```
2. In the `frontend/` directory, create a `.env` file with the following content, ensuring the domain name matches the backend server's domain.
    ```
    VITE_API_URL="http://localhost:8000/api"
    ```
3. Start the frontend server:
    ```console
    $ yarn start
        ...
        ➜  Local:   http://localhost:4173/
        ➜  Network: use --host to expose
        ➜  press h to show help
    ```
4. Open the output URL in your browser to view the web page. In this example, go to http://localhost:4173/.

## Reference
This project is the HW2 for the EE3035: Web Programming course, Fall 2023.
Some of the code has been adapted from the demo available at:
[https://github.com/ntuee-web-programming/112-1-unit1-trello-clone](https://github.com/ntuee-web-programming/112-1-unit1-trello-clone).
