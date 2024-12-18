# Installing Packages

Use `requirements.txt` for install module and libraries or use following command :

`pip install fastapi[standard]`

(All libraries are installed by use this command)

installed modules and libraries : ***`fastapi - uvicorn - pydantic - typing - jinja2`***

# DataBase
### Todos Table

| Name | Type |
| -------- | ------- |
| `id` | `INTEGER` |
| `owner` | `STRING` |
| `title`  | `STRING` |
| `completed` | `BOOLEAN` |
| `dueDate` | `STRING-NULL` |
| `priority` | `STRING-NULL` |
| `image_url` | `STRING-NULL` |

### Users Table

| Name | Type |
| -------- | ------- |
| `full_name` | `STRING` |
| `email`  | `STRING` |
| `password` | `STRING` |
| `avatar_url` | `STRING-NULL` |

# How to run server/API
1. Install package and libraries 
2. Create database file and make table
3. Run `main.py` file