from pymongo_get_database import get_database, add_user, add_project, get_users, get_projects, update_user_password, update_project_details, delete_user, delete_project

# Get the database
dbname = get_database()

# Add users and projects
add_user("user1", "password123")
add_user("user2", "password234")

add_project("Project 1", "Description of Project 1", 1000, 0, "user1", ["user1", "user2"])

# Get and display users
print("Users:")
users = get_users()
for user in users:
    print(f"Username: {user['username']}, Password: {user['password']}")

# Get and display projects
print("\nProjects:")
projects = get_projects()
for project in projects:
    print(f"Name: {project['name']}")
    print(f"Description: {project['description']}")
    print(f"Amount Available: {project['amountAvailable']}")
    print(f"Amount Checked Out: {project['amountCheckedOut']}")
    print(f"Owner: {project['owner']}")
    print(f"Members: {project['members']}")

# Update a user's password
update_user_password("user1", "newpassword123")

# Update a project's details
add_user("user3", "password360")
update_project_details("Project 1", "Updated Description", 2000, 500, ["user1", "user2", "user3"])

# Display updated user and project information
print("\nUpdated User and Project Information:")
updated_users = get_users()
for user in updated_users:
    print(f"Username: {user['username']}, Password: {user['password']}")

updated_projects = get_projects()
for project in updated_projects:
    print(f"Name: {project['name']}")
    print(f"Description: {project['description']}")
    print(f"Amount Available: {project['amountAvailable']}")
    print(f"Amount Checked Out: {project['amountCheckedOut']}")
    print(f"Owner: {project['owner']}")
    print(f"Members: {project['members']}")

# Delete
delete_user("user1")
delete_user("user2")
delete_user("user3")
delete_project("Project 1")
