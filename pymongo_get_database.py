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

if __name__ == "__main__":
    dbname = get_database()
