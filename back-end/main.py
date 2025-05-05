import uvicorn
import os
from DATABASE.init_db import initialize_database

if __name__ == "__main__":
    
    # Setup database file and tables
    try:
        initialize_database()
    except:
        pass

    # Setup directories and assets
    try:
        os.makedirs(os.path.join('ASSETS' , 'Profiles'),exist_ok=True)
        os.makedirs(os.path.join('ASSETS' , 'Todos'),exist_ok=True)
    except:
        pass

    # Run API server
    uvicorn.run(app="config:Api", host="0.0.0.0", port=8000, reload=True)


# ------------ WARNING --------------
# change value of reload parametr to False when project ready for production !!!
