from pymongo import MongoClient

def get_database():
    CONNECTION_STRING = "mongodb+srv://ckrishna:pass@cluster0.b99hdoa.mongodb.net/"
    client = MongoClient(CONNECTION_STRING)
    db = client['461L']

    if 'users' not in db.list_collection_names():
        db.create_collection('users')

    if 'projects' not in db.list_collection_names():
        db.create_collection('projects')
    return db

def add_user(username, password):
    db = get_database()
    users_collection = db['users']
    user_data = {
        'username': username,
        'password': password
    }
    users_collection.insert_one(user_data)

def add_project(name, description, amount_available, amount_checked_out, owner, members):
    db = get_database()
    projects_collection = db['projects']
    project_data = {
        'name': name,
        'description': description,
        'amountAvailable': amount_available,
        'amountCheckedOut': amount_checked_out,
        'owner': owner,
        'members': members
    }
    projects_collection.insert_one(project_data)

def get_users():
    db = get_database()
    users_collection = db['users']
    return list(users_collection.find())

def get_projects():
    db = get_database()
    projects_collection = db['projects']
    return list(projects_collection.find())

def get_user(username):
    db = get_database()
    users_collection = db['users']
    return users_collection.find_one({'username': username})

def get_project(name):
    db = get_database()
    projects_collection = db['projects']
    return projects_collection.find_one({'name': name})

def update_user_password(username, new_password):
    db = get_database()
    users_collection = db['users']
    users_collection.update_one({'username': username}, {'$set': {'password': new_password}})

def update_project_details(name, new_description, new_amount_available, new_amount_checked_out, new_members):
    db = get_database()
    projects_collection = db['projects']
    projects_collection.update_one(
        {'name': name},
        {
            '$set': {
                'description': new_description,
                'amountAvailable': new_amount_available,
                'amountCheckedOut': new_amount_checked_out,
                'members': new_members
            }
        }
    )

def delete_user(username):
    db = get_database()
    users_collection = db['users']
    users_collection.delete_one({'username': username})

def delete_project(name):
    db = get_database()
    projects_collection = db['projects']
    projects_collection.delete_one({'name': name})

if __name__ == "__main":
    dbname = get_database()