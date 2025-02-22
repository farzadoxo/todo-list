import logging



def setup_logger(name, log_file, level=logging.INFO):
    """To setup as many loggers as you want"""
    formatter = logging.Formatter('%(asctime)s %(levelname)s %(message)s')

    handler = logging.FileHandler(log_file)        
    handler.setFormatter(formatter)

    logger = logging.getLogger(name)
    logger.setLevel(level)
    logger.addHandler(handler)

    return logger





class LoggerSetup:

    server_logger = setup_logger(name="ServerLogger",log_file='./API.log')
    user_logger = setup_logger(name="UserLogger",log_file='./USER.log')
    todo_logger = setup_logger(name="TodoLogger",log_file="./TODO.log")





class LogSystem:
    """Log all things happend in API and DATABASE
       Log users acctivity and todos status"""

    class TodoLog:
        """Log todos status (users.log)"""


        def on_todo_create(id:str):
            LoggerSetup.todo_logger.info("➕ New todo created! id : {}".format(id))

        def on_todo_remove(id:str):
            LoggerSetup.todo_logger.info("➖ Todo deleted! id : {}".format(id))
        
        def on_todo_update(id:str):
            LoggerSetup.todo_logger.info("🔝 Todo updated! id : {}".format(id))


    class UserLog:
        """Log user status (todos.log)"""


        def on_user_signup(email:str):
            LoggerSetup.user_logger.info("📝 New user signed up! email : {}".format(email))

        def on_user_login(email:str):
            LoggerSetup.user_logger.info("📲 User logedin! email : {}".format(email))

        def on_user_deleted(email:str):
            LoggerSetup.user_logger.info("🗑️ Account deleted! email : {}".format(email))
        
        def on_user_update(email:str):
            LoggerSetup.user_logger.info("🔝 User Updated! email : {}".format(email))