import uvicorn

if __name__ == "__main__":
    uvicorn.run(app="API.config:Api" , host='0.0.0.0' , port=8000 , reload=True)


# ------------ WARNING --------------
# change value of reload parametr to False when project ready for production !!!