# ReportINC - Financial Report Solution
Welcome to ReportINC, your comprehensive financial report solution. This front end application is designed to provide users with insightful analytics and management tools for their investments.

###### Note: The ideal resolution for using this application is 1920x1080. Support for other resolutions is yet to be implemented.

## Project Overview
ReportINC utilizes Vue.js as the frontend framework along with various libraries and components to visualize and manage financial data effectively.

## Getting Started
To get started with ReportINC on your local machine, you have the choice of utilizing Docker for a unified setup, or running each service individually for both front and backend.
## Prerequisites
Node.js (v14 or higher recommended)
npm (Node Package Manager)
Vue CLI (if not installed, you can install it globally using npm install -g @vue/cli)
Installation
Clone the repository

```bash
git clone https://github.com/jontatan25/client-management
cd financial-advisor-app
```
# Build and Run with Docker Compose
Use the following command to start the application:

```bash
docker-compose up --build

```
## Accessing the Application (Docker)
- Backend: The backend service will be accessible at http://localhost:3000.
- Frontend: The frontend service will be accessible at http://localhost:5173.

## Stopping the Application (Docker)
To stop the application and remove the containers, press Ctrl + C in the terminal where docker-compose up is running.

```bash
docker-compose down
```
# Running Services Individually
## Install Backend dependencies

```bash
cd backend
npm install
```
## Running the Fastify Server (Backend)
```bash
npm run start
```
## Install Frontend dependencies

```bash
cd frontend
npm install
```
## Configuration
Environment Variables

Create a .env file in the root of the frontend directory and add the following environment variable:

```bash

VITE_API_URL=http://localhost:3000/api
```
This environment variable points to the backend API URL where the frontend will fetch data.

## Running the Vue.js Development Server
```bash
npm run dev
```
This command compiles and hot-reloads the application for development. The application will be available at http://localhost:5173.

## Building for Production
```bash
npm run build
```
Builds the app for production to the dist directory. Use this for deployment.

## More Commands
```bash
npm run lint
```
Lints and fixes files

```bash
npm run test
```
Run your tests


## Folder Structure
- src/: Contains the main source code of the application
- public/: Static assets and index.html
- tests/: Test files
## Technologies Used
- Vue.js
- Vue Router
- Pinia
- Axios for HTTP requests
- Tailwind CSS
- Chartjs
- Vue-chartjs
- Fastify
- Csv-parser

## Contributing
Feel free to contribute to ReportINC. Fork the repository and submit a pull request with your changes.

License
This project is licensed under the MIT License - see the LICENSE file for details.
