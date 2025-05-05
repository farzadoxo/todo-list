# Use the official Python image from the Docker Hub
FROM python:latest

# Set the working directory inside the container
WORKDIR /backend

# Copy the requirements file into the container
COPY requirements.txt .

# Install any needed packages specified in requirements.txt
RUN pip install -r requirements.txt

# Copy the rest of your application code into the container
COPY . .

# Run the database initialization script
RUN python ./DATABASE/init_db.py

# Expose the port that Uvicorn will run on
EXPOSE 8000

# Command to run the FastAPI application using Uvicorn
CMD ["python3", "main.py"]
