from pymongo_get_database import get_database, add_user, add_project

# Get the database
dbname = get_database()

# Add a user
add_user("user1", "password123")
add_user("user2", "password234")

# Add a project
add_project("Project 1", "Description of Project 1", 1000, 0, "user1", ["user1", "user2"])
