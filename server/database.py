import sqlite3

# Connect to the database
connection = sqlite3.connect('database.db')
cursor = connection.cursor()

# Drop the old table if it exists
cursor.execute('DROP TABLE IF EXISTS products')

# Create the products table without the description column
cursor.execute('''
CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    brand TEXT,
    category TEXT,
    rating REAL,
    color TEXT,
    size TEXT
)
''')

# Commit the changes and close the connection
connection.commit()
connection.close()
