import sqlite3

def init_db():
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()

    # Create the products table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        brand TEXT,
        category TEXT,
        rating REAL,
        color TEXT,
        size TEXT,
        quantity INTEGER NOT NULL,
        on_sale BOOLEAN NOT NULL
    )
    ''')

    # Create the sales table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS sales (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        product_id INTEGER NOT NULL,
        customer_name TEXT NOT NULL,
        customer_address TEXT NOT NULL,
        quantity INTEGER NOT NULL,
        total_price REAL NOT NULL,
        FOREIGN KEY (product_id) REFERENCES products (id)
    )
    ''')

    conn.commit()
    conn.close()

if __name__ == '__main__':
    init_db()
