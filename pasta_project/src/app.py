from flask import Flask, request, jsonify
from pymongo_get_database import *

app = Flask(__name__)

@app.route('/add_user', methods=['POST'])
def route_add_user():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    add_user(username, password)
    return jsonify({'message': 'User added successfully'})

@app.route('/add_project', methods=['POST'])
def route_add_project():
    data = request.get_json()
    name = data.get('name')
    description = data.get('description')
    amount_available = data.get('amount_available')
    amount_checked_out = data.get('amount_checked_out')
    owner = data.get('owner')
    members = data.get('members')
    add_project(name, description, amount_available, amount_checked_out, owner, members)
    return jsonify({'message': 'Project added successfully'})

@app.route('/add_hardwareSet', methods=['POST'])
def route_add_hardwareSet():
    data = request.get_json()
    name = data.get('name')
    description = data.get('description')
    amount_available = data.get('amount_available')
    amount_checked_out = data.get('amount_checked_out')
    owner = data.get('owner')
    projects = data.get('projects')
    add_hardwareSet(name, description, amount_available, amount_checked_out, owner, projects)
    return jsonify({'message': 'HardwareSet added successfully'})

@app.route('/get_database', methods=['GET'])
def route_get_databases():
    db = get_database()
    return jsonify({'message': 'Database connected'})

@app.route('/get_users', methods=['GET'])
def route_get_users():
    users = get_users()
    return jsonify(users)

@app.route('/get_projects', methods=['GET'])
def route_get_projects():
    projects = get_projects()
    return jsonify(projects)

@app.route('/get_hardwareSet', methods=['GET'])
def route_get_hardwareSet():
    hardwareSet = get_hardwareSets()
    return jsonify(hardwareSet)

@app.route('/get_user', methods=['POST'])
def route_get_user():
    data = request.get_json()
    username = data.get('username')
    user = get_user(username)
    return jsonify(user)

@app.route('/get_project', methods=['POST'])
def route_get_project():
    data = request.get_json()
    name = data.get('name')
    project = get_project(name)
    return jsonify(project)

@app.route('/get_hardwareSet', methods=['POST'])
def route_get_hardwareSet():
    data = request.get_json()
    name = data.get('name')
    hardwareSet = get_hardwareSet(name)
    return jsonify(hardwareSet)

@app.route('/update_user_password', methods=['PUT'])
def route_update_user_password():
    data = request.get_json()
    username = data.get('username')
    new_password = data.get('new_password')
    update_user_password(username, new_password)
    return jsonify({'message': 'User password updated successfully'})

@app.route('/update_project_details', methods=['PUT'])
def route_update_project_details():
    data = request.get_json()
    name = data.get('name')
    new_description = data.get('new_description')
    new_amount_available = data.get('new_amount_available')
    new_amount_checked_out = data.get('new_amount_checked_out')
    new_members = data.get('new_members')
    update_project_details(name, new_description, new_amount_available, new_amount_checked_out, new_members)
    return jsonify({'message': 'Project details updated successfully'})

@app.route('/update_hardwareSet_details', methods=['PUT'])
def route_update_hardwareSet_details():
    data = request.get_json()
    name = data.get('name')
    new_description = data.get('new_description')
    new_amount_available = data.get('new_amount_available')
    new_amount_checked_out = data.get('new_amount_checked_out')
    new_projects = data.get('new_projects')
    update_hardwareSet_details(name, new_description, new_amount_available, new_amount_checked_out, new_projects)
    return jsonify({'message': 'HardwareSet details updated successfully'})

@app.route('/delete_user', methods=['DELETE'])
def route_delete_user():
    data = request.get_json()
    username = data.get('username')
    delete_user(username)
    return jsonify({'message': 'User deleted successfully'})

@app.route('/delete_project', methods=['DELETE'])
def route_delete_project():
    data = request.get_json()
    name = data.get('name')
    delete_project(name)
    return jsonify({'message': 'Project deleted successfully'})

@app.route('/delete_hardwareSet', methods=['DELETE'])
def route_delete_hardwareSet():
    data = request.get_json()
    name = data.get('name')
    delete_hardwareSet(name)
    return jsonify({'message': 'HardwareSet deleted successfully'})

if __name__ == '__main__':
    app.run(debug=True)
