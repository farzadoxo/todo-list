<div align="center">
    <img src="https://img.shields.io/badge/status-Launching  🚀-green">
    <img src="https://img.shields.io/badge/server-Offline-red">
    <img src="https://img.shields.io/badge/Version-0.1-purple">
</div>

# 📸 Camera Todo list
This todo app allows you to create todos, manage them, and save them on a server so you can access them anywhere.
What distinguishes this todo app from other todo apps is that instead of checking off todos, you can take a picture of the completed task! 📝

## Options
- Online - Cloud base ☁️
- Upload Mechanism 📤
- Additional details of Todo 📝
- Auth system 📇
- Beautiful GUI 🎨
  
# Used Technologies
- Front-End:
  - Html - Css
  - Js - TS
  - React
  - Vite
- Back-End:
  - Python
  - FastAPI
  - Sqlite3
  - Pyjwt

# Back-end Development Setup
This guide provides steps to set up and run the React-based front-end application for the Todo List project.

### Prerequisites

- Ensure Docker is installed on your system
- Make sure you have Git installed and configured properly

### Step 1: Clone this repository
```bash
git clone https://github.com/farzadoxo/todo-list && cd todo-list/back-end
```
### Step 2: Build the docker image
```bash
docker build -t todo-back .
```
### Step 3: Run The Container
Launch the Docker container with port forwarding:

```bash
docker run -p 8080:8000 --name back-front-container todo-back
```
### Additional Notes

- The default port for the fastapi development server is 8080, which is forwarded to port 8000.
- You can access the application at `http://localhost:8000` once the container starts.
- To stop the container, use the command: `docker stop todo-back-container`
- You can access to the FastAPI Swagger UI at `http://localhost:8000/docs` once the container starts.

# Front-end Development Setup

This guide provides steps to set up and run the React-based front-end application for the Todo List project.

### Prerequisites

- Ensure Docker is installed on your system
- Make sure you have Git installed and configured properly

### Step 1: Clone the Repository

First, download the source code from GitHub:

```bash
git clone https://github.com/farzadoxo/todo-list.git cd todo-list/front-end
```

### Step 2: Build the Docker Image

Navigate to the front-end directory and build the Docker image:

```bash
docker build -t todo-front .
```

### Step 3: Run the Container

Launch the Docker container with port forwarding:

```bash
docker run -p 3000:5173 --name todo-front-container todo-front
```

### Additional Notes

- The default port for the React development server is 5173, which is forwarded to port 3000.
- You can access the application at `http://localhost:3000` once the container starts.
- To stop the container, use the command: `docker stop todo-front-container`

### Troubleshooting

If you encounter issues during the setup process:

1. Ensure all prerequisites (Git, Docker) are correctly installed and configured.
2. Check if you have sufficient permissions to execute Docker commands.
3. Verify that the repository URL is correct and accessible.
4. If problems persist, review the Dockerfile and ensure it's compatible with your system configuration.

# How to use?
### Step 1: Clone repository
Clone this repository from github and change directory to project using command below:
```bash
git clone https://github.com/farzadoxo/todo-list && cd todo-list
```
### Step 2: Build and Run docker image
Create a docker image and run it using docker-compose using command below:
```bash
docker compose up
```

# Documation
- [Database](https://github.com/farzadoxo/todo-list/blob/master/back-end/README.md)
- [Api Endpoints](https://github.com/farzadoxo/todo-list/blob/master/docs/api.md)
- [FrontEnd](https://github.com/farzadoxo/todo-list/tree/master/front-end)


_________
**If you enjoyed this project or use it leave me a STAR in github ⭐**
