import pytest
from fastapi.testclient import TestClient
from API.config import Api

client = TestClient(Api)


@pytest.fixture(scope="module")
def setup_todos():
    # Create initial todos for testing
    client.post(
        "/api/todos/",
        json={"title": "Test Todo", "completed": False, "dueDate": "2024-10-07"},
    )
    yield
    # Optionally clean up after tests if needed


def test_get_all_todos(setup_todos):
    response = client.get("/api/todos/")
    assert response.status_code == 200
    assert "todos" in response.json()
    assert isinstance(response.json()["todos"], list)


def test_create_new_todo():
    new_todo = {"title": "Buy groceries", "completed": False, "dueDate": "2024-10-07"}
    response = client.post("/api/todos/", json=new_todo)
    assert response.status_code == 201
    assert response.json()["title"] == new_todo["title"]
    assert response.json()["completed"] == new_todo["completed"]
    assert response.json()["dueDate"] == new_todo["dueDate"]


def test_update_todo():
    update_data = {"title": "Updated title", "completed": True, "dueDate": None}

    # Assuming the ID of the created todo is known (e.g., ID 1)
    response = client.patch("/api/todos/1", json=update_data)
    assert response.status_code == 200
    assert response.json()["title"] == update_data["title"]
    assert response.json()["completed"] == update_data["completed"]


def test_delete_todo():
    # Assuming the ID of the created todo is known (e.g., ID 1)
    response = client.delete("/api/todos/1")
    assert response.status_code == 200
    assert response.json()["id"] == 1


def test_upload_image():
    image_data = {
        "task_id": "14",
        "image": b"fake_image_data",  # Use actual binary data if needed
    }

    response = client.post("/api/upload/", json=image_data)
    assert response.status_code == 201
    assert response.json()["task_id"] == image_data["task_id"]


# Additional error handling tests can be added here.
