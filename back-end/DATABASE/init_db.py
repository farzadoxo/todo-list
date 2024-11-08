import sqlite3
import os


def create_database(db_name: str = "database.db"):
    """Create the database and todos table if it doesn't already exist."""

    current_dir = os.getcwd()
    db_path = os.path.join(current_dir, "DATABASE", db_name)

    # Ensure the __tests__ directory exists
    os.makedirs(os.path.dirname(db_path), exist_ok=True)

    # Establish a connection to the SQLite database
    with sqlite3.connect(db_path) as conn:
        cursor = conn.cursor()
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS todos (
                id INTEGER PRIMARY KEY,
                title TEXT NOT NULL,
                completed BOOLEAN NOT NULL,
                dueDate TEXT
            )
        """)
        conn.commit()  # Commit changes


if __name__ == "__main__":
    create_database()
