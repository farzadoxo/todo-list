from random import randint
from DATABASE.Db import DataBase
import logging
import os
import jwt
import json




        

















def setup_directories():
    try:
        os.makedirs(os.path.join('ASSETS' , 'Profiles'),exist_ok=True)
        os.makedirs(os.path.join('ASSETS' , 'Todos'),exist_ok=True)
    except:
        pass