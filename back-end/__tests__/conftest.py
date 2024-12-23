import sys
import os
import pytest
import sqlite3

# Add the parent directory (project root) to sys.path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from fastapi.testclient import TestClient
from API.config import Api
from DATABASE.init_db import initialize_database


# @pytest.fixture(scope="session")
# def db():
#     """Fixture to set up a test database."""
#     db_name = "test.db"
#
#     # Initialize the database using init_db.py
#     create_database(db_name)
#
#     # Connect to the SQLite database
#     connection = sqlite3.connect(db_name)
#
#     yield connection
#
#     # Cleanup: close the connection and remove the test database file after tests
#     connection.close()
#     os.remove(db_name)
#
#
# @pytest.fixture(scope="module")
# def client():
#     """Fixture to create a TestClient for FastAPI."""
#     with TestClient(Api) as c:
#         yield c
#
#
# @pytest.fixture(scope="function", autouse=True)
# def clean_db(db):
#     """Fixture to clean the database before each test function."""
#     cursor = db.cursor()
#
#     # Clear todos table before each test
#     cursor.execute("DELETE FROM todos")
#     db.commit()
#
#
# @pytest.fixture
# def sample_todo():
#     """Fixture to provide a sample todo item."""
#     return {"title": "Buy groceries", "completed": False, "dueDate": "2024-10-07"}
#
#
# @pytest.fixture
# def sample_image_upload():
#     """Fixture to provide a sample image upload data."""
#     return {
#         "task_id": "14",
#         "image": "IMage",  # Replace with actual image data if needed.
#     }
