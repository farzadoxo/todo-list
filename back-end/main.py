import uvicorn
from API.self_module import setup_directories

if __name__ == "__main__":
     # Setup directories and assets
    setup_directories()
    # Run API server
    uvicorn.run(app="API.config:Api", host="0.0.0.0", port=8000, reload=True)


# ------------ WARNING --------------
# change value of reload parametr to False when project ready for production !!!
