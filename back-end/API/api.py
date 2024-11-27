from API.models import NewTask, UpdateTask, Upload, SignUp, Login, UpdateAccountInfo
from API.self_module import ResponseBody, IDGenerator
from DATABASE.Db import DataBase
from fastapi import status, HTTPException, APIRouter, Response
from fastapi.responses import JSONResponse


# router instanse
router = APIRouter()


# --------------------     User Section     --------------------

@router.post(
    '/api/account/signup',
    status_code=status.HTTP_201_CREATED,
    summary="Create Account",
    description="Create account need a request body with 3 item (username , email , password)"
)
def signup(reqbody:SignUp , response:Response):
    # fetch availeble user from database
    DataBase.cursor.execute(
        f"SELECT * FROM users WHERE email = '{reqbody.email}'"
    )
    user = DataBase.cursor.fetchone()

    if user != None:
        response.status_code = status.HTTP_409_CONFLICT
        return "This email has already been used !"
    else:
        try:
            # create a recorde (user signup)
            DataBase.cursor.execute(
                f"INSERT INTO users VALUES (?,?,?)" , (reqbody.fullname,reqbody.email,reqbody.password)
            )
            DataBase.connection.commit()

            # refetch user from database
            DataBase.cursor.execute(
                f"SELECT * FROM users WHERE email = '{reqbody.email}'"
            )
            user = DataBase.cursor.fetchone()

            # Returned 
            return ResponseBody.UserResponseBody(user=user)
            

            
        except Exception or HTTPException as error :
            response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
            return f"ERROR >>> {error}"

