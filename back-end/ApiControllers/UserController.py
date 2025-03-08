from Extentions.LogExtention import LogSystem
from Extentions.ResponseExtention import ResponseBody
from DTOs.User import (Signup,Login,DeleteAccount,UpdateAccountInfo,UpdateProfileInfo)
from DATABASE.Db import DataBase
from fastapi import (status, HTTPException, APIRouter, Response , File , UploadFile)
import os
import jwt


# router instanse
router = APIRouter()


# --------------------     User Section     --------------------

@router.post(
    '/api/register',
    status_code=status.HTTP_201_CREATED,
    summary="Create Account",
    description="Create account need a request body with 3 item (username , email , password)"
)
def signup(reqbody:Signup , response:Response):
    # fetch availeble user from database
    DataBase.cursor.execute(
        f"SELECT * FROM users WHERE email = '{jwt.encode({'email':reqbody.email.lower()},"secret",algorithm="HS256")}'"
    )
    user = DataBase.cursor.fetchone()

    if user != None:
        response.status_code = status.HTTP_409_CONFLICT
        return "This email has already been used !"
    else:
        try:
            if len(reqbody.password) >= 8:
                # create a recorde (user signup)
                user_values = (jwt.encode({'full_name':reqbody.full_name},"secret",algorithm="HS256"),
                               jwt.encode({'email':reqbody.email.lower()},"secret",algorithm="HS256"),
                               jwt.encode({'password':reqbody.password},"secret",algorithm="HS256"),
                               None)
                DataBase.cursor.execute(
                    f"INSERT INTO users VALUES (?,?,?,?)" , user_values
                )
                DataBase.connection.commit()
                # Log 
                LogSystem.UserLog.on_user_signup(email=reqbody.email)

                # refetch user from database
                DataBase.cursor.execute(
                    f"SELECT * FROM users WHERE email = '{jwt.encode({'email':reqbody.email.lower()},"secret",algorithm="HS256")}'"
                )
                user = DataBase.cursor.fetchone()

                # Returned 
                return ResponseBody.UserResponseBody(user=user)
            else:
                response.status_code = status.HTTP_400_BAD_REQUEST
                return "Password must be 8 character !"
            

            
        except Exception or HTTPException as error :
            response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
            return f"ERROR >>> {error}"





@router.post(
    '/api/login',
    status_code= status.HTTP_200_OK,
    summary="Login to account",
    description="Login to a account using email and password"
)
def login(reqbody:Login , response : Response):
    # Fetch user info from database
    DataBase.cursor.execute(
        f"SELECT * FROM users WHERE email = '{jwt.encode({'email':reqbody.email.lower()},'secret',algorithm='HS256')}'"
    )
    user = DataBase.cursor.fetchone()

    try:
        if user == None:
            response.status_code = status.HTTP_401_UNAUTHORIZED
            return "User Not Found !"
        
        else:
            if reqbody.email.lower() == jwt.decode(user[1],'secret',algorithms='HS256')['email'] and reqbody.password == jwt.decode(user[2],'secret',algorithms='HS256')['password']:
                # Log 
                LogSystem.UserLog.on_user_login(email=reqbody.email)
                # Return
                return
                         
            else:
                response.status_code = status.HTTP_400_BAD_REQUEST
                return "Password Invalid !"
            
    except Exception or HTTPException as error:
        response.status_code = status.WS_1011_INTERNAL_ERROR
        return f"ERROR >>> {error}"




@router.patch(
    '/api/account/{email}',
    status_code= status.HTTP_200_OK,
    summary="Change account info",
    description="Change account info or update account info"
)
def edit_account_info(reqbody:UpdateAccountInfo , email:str , response:Response):
    # fetch data from database
    DataBase.cursor.execute(
        f"SELECT * FROM users WHERE email = '{jwt.encode({'email':email.lower()},'secret',algorithm='HS256')}'"
    )
    user = DataBase.cursor.fetchone()

    try:
        if user != None:
            # Set new password
            if reqbody.new_password != None:
                if reqbody.new_password != jwt.decode(user[2],'secret',algorithms='HS256')['password'] and len(reqbody.new_password) >= 8:
                    DataBase.cursor.execute(
                        f"UPDATE users SET password = '{jwt.encode({'password':reqbody.new_password},'secret',algorithm='HS256')}' WHERE email = '{jwt.encode({'email':email.lower()},'secret',algorithm='HS256')}'"
                    )
                    DataBase.connection.commit()
                else:
                    response.status_code = status.HTTP_400_BAD_REQUEST
                    return "The new password must be 8 characters long and cannot be the same as the current password!"
                

            # Set new email
            if reqbody.new_email != None:
                if reqbody.new_email.lower() != jwt.decode(user[1],'secret',algorithms='HS256')['email']:
                    DataBase.cursor.execute(
                        f"UPDATE users SET email = '{jwt.encode({'email':reqbody.new_email.lower()},'secret',algorithm='HS256')}' WHERE email = '{jwt.encode({'email':email.lower()},'secret',algorithm='HS256')}'"
                    )
                    DataBase.connection.commit()
                else:
                    response.status_code = status.HTTP_409_CONFLICT
                    return "New email can not be the same as the current email!"
            

            
            if reqbody.new_email != None:
                DataBase.cursor.execute(
                    f"SELECT * FROM users WHERE email = '{jwt.encode({'email':reqbody.new_email.lower()},'secret',algorithm='HS256')}'"
                )
                user = DataBase.cursor.fetchone()

                #Log
                LogSystem.UserLog.on_user_update(email=reqbody.new_email)
                # Return
                return ResponseBody.UserResponseBody(user=user)

            else:
                DataBase.cursor.execute(
                    f"SELECT * FROM users WHERE email = '{jwt.encode({'email':email.lower()},'secret',algorithm='HS256')}'"
                )
                user = DataBase.cursor.fetchone()

                # Log
                LogSystem.UserLog.on_user_update(email=email)
                # Return
                return ResponseBody.UserResponseBody(user=user)

        else:
            response.status_code = status.HTTP_404_NOT_FOUND
            return "User Not Found !"
    
    except Exception or HTTPException as error:
        response.status_code = status.WS_1011_INTERNAL_ERROR
        return f"ERROR >>> {error}"




@router.patch(
    '/api/profile/{email}',
    status_code=status.HTTP_200_OK,
    summary="Change profile info",
    description="Change profile info like FullName or Avatar"
)
async def edit_profile_info(email:str , reqbody:UpdateProfileInfo ,response:Response , image:UploadFile = File(default=None)):
    # fetch user from database
    DataBase.cursor.execute(
        f"SELECT * FROM users WHERE email = '{jwt.encode({'email':email.lower()},'secret',algorithm='HS256')}'"
    )
    user = DataBase.cursor.fetchone()

    if user != None:
        
        try:
            if reqbody.new_full_name != None:
                DataBase.cursor.execute(
                    f"UPDATE users SET full_name = '{jwt.encode({'full_name':reqbody.new_full_name},'secret',algorithm='HS256')}' WHERE email = '{jwt.encode({'email':email.lower()},'secret',algorithm='HS256')}'"
                )
                DataBase.connection.commit()
        

            if image != None:
                # Saving file
                unique_filename = f"file_{os.urandom(16).hex()}"
                with open(f"./ASSETS/Profiles/{unique_filename}.{list(image.content_type.split('/'))[1]}" , "wb") as buffer :
                    content = await image.read()
                    buffer.write(content)

                DataBase.cursor.execute(
                    f"UPDATE users SET avatar_url = '/ASSETS/Profiles/{unique_filename}.{list(image.content_type.split('/'))[1]}' WHERE email = '{jwt.encode({'email':email.lower()},'secret',algorithm='HS256')}'"
                )
                DataBase.connection.commit()

        except Exception or HTTPException as error:
            response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
            return f"ERROR >>> {error}"
        


        DataBase.cursor.execute(
            f"SELECT * FROM users WHERE email = '{jwt.encode({'email':email.lower()},'secret',algorithm='HS256')}'"
        )
        updated_user = DataBase.cursor.fetchone()


        # Log
        LogSystem.UserLog.on_user_update(email=email)
        # Return
        return ResponseBody.UserResponseBody(user=updated_user)
    
    
    else:
        response.status_code = status.HTTP_404_NOT_FOUND
        return "User Not Found !"





@router.delete(
        '/api/account/{email}',
        status_code=status.HTTP_200_OK,
        summary="Delete account",
        description="Delete Account info and all user todos"
)
def delete_account(reqbody:DeleteAccount ,email:str, response:Response):
    DataBase.cursor.execute(
        f"SELECT * FROM users WHERE email = '{jwt.encode({'email':email.lower()},'secret',algorithm='HS256')}'"
    )
    user = DataBase.cursor.fetchone()

    if user != None:
        if reqbody.password == jwt.decode(user[2],'secret',algorithms='HS256')['password']:
            try:
                # ------- Delete Account -------
                DataBase.cursor.execute(
                    f"DELETE FROM users WHERE email = '{jwt.encode({'email':email.lower()},'secret',algorithm='HS256')}'"
                )
                DataBase.connection.commit()

                # ------- Delete Todos --------
                DataBase.cursor.execute(
                    f"DELETE FROM todos WHERE owner = '{jwt.encode({'owner':email.lower()},'secret',algorithm='HS256')}'"
                )
                DataBase.connection.commit()

                
                # Log
                LogSystem.UserLog.on_user_deleted(email=email)
                # Return 
                return f"Account and all its todos were successfully deleted."
                
            
            except Exception or HTTPException as error:
                response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
                return f"ERROR >>> {error}"
        
        else:
            response.status_code = status.HTTP_400_BAD_REQUEST
            return "Password Invalid !"
    
    else:
        response.status_code = status.HTTP_404_NOT_FOUND
        return "Account Not Found!"


