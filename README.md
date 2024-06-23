# ReportINC - Financial Report Solution (Frontend)
Welcome to ReportINC, your comprehensive financial report solution. This front end application is designed to provide users with insightful analytics and management tools for their investments.

## Project Overview
ReportINC utilizes Vue.js as the frontend framework along with various libraries and components to visualize and manage financial data effectively.

## Getting Started
To get started with the ReportINC frontend on your local machine, follow these steps:

## Prerequisites
Node.js (v14 or higher recommended)
npm (Node Package Manager)
Vue CLI (if not installed, you can install it globally using npm install -g @vue/cli)
Installation
Clone the repository

```bash
git clone https://github.com/jontatan25/client-management
```
## Install dependencies

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

## Running the Development Server
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

## Contributing
Feel free to contribute to ReportINC. Fork the repository and submit a pull request with your changes.

License
This project is licensed under the MIT License - see the LICENSE file for details.
