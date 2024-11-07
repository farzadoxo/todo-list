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
