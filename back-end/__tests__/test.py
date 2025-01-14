import jwt








test = jwt.encode({'name':"farzad",'age':18},"secret",algorithm="HS256")
print(test)
print(type(test))

test2 = jwt.decode(test,"secret",algorithms="HS256")
print(test2)
print(type(test2))

my_name = test2['name']
print(my_name)
my_age = test2['age']
print(my_age)

user_info = (test2['name'],test2['age'])
print(user_info)