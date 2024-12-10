import sqlite3
import os


def initialize_database(db_name: str = "database.db"):
    """Create the database and todos table if it doesn't already exist."""

    current_dir = os.getcwd()
    db_path = os.path.join(current_dir, "DATABASE_FILES", db_name)

    os.makedirs(os.path.dirname(db_path), exist_ok=True)

    # Establish a connection to the SQLite database
    with sqlite3.connect(db_path) as conn:
        cursor = conn.cursor()
        
        

        # making the users table
        cursor.execute(
            """
            CREATE TABLE IF NOT EXISTS users (
                full_name TEXT NOT NULL ,
                email TEXT NOT NULL PRIMARY KEY,
                password TEXT NOT NULL ,
                avatar_url TEXT

            )
        """
        )

        
        # making the todos table
        cursor.execute(
            """
            CREATE TABLE IF NOT EXISTS todos (
                id INTEGER PRIMARY KEY,
                title TEXT NOT NULL,
                completed BOOLEAN NOT NULL,
                dueDate TEXT ,
                priority TEXT ,
                image_url TEXT ,
                FOREIGN KEY (id) REFERENCES users (email)  
            )
        """
        )

        # inseting mock data into todos
        cursor.execute(
            """
            INSERT INTO todos (id, title, completed, dueDate , priority) VALUES 
                (1, 'Complete project documentation', 0, '2024-10-15' , 'low'),
                (2, 'Design user interface', 0, '2024-09-30' ,'high'),
                (3, 'Implement authentication module', 1, '2024-08-20' ,'low'),
                (4, 'Conduct user testing', 0, '2024-11-05' ,'medium'),
                (5, 'Fix bugs reported by QA', 0, '2024-11-10' ,null),
                (6, 'Prepare presentation for stakeholders', 0, '2024-11-15' ,'high'),
                (7, 'Deploy application to production', 0, '2024-12-01', 'medium');
            """
        )
        conn.commit()

        # inseting mock data into users
        cursor.execute(
            """
            INSERT INTO users (full_name, email, password) VALUES 
                ('mamad', 'mamad@gmail.com', 'sdfdfhg'),
                ('ali', 'ali@gmail.com', 'fdhdfhdfhg'),
                ('hosein', 'hosein@gmail.com', 'ssadasd'),
                ('farzad', 'farzad@gmail.com', 'vcvv345435'),
                ('farshid', 'farshid@gmail.com', '54df8g97we'),
                ('zahra', 'zahra@gmail.com', '567cxbvvbdfg'),
                ('anahita', 'anahita@gmail.com', '234234234234');
            """
        )
        conn.commit()


if __name__ == "__main__":
    initialize_database()

