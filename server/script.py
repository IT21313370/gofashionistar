import sqlite3
import csv

conn = sqlite3.connect('database.db')
cursor = conn.cursor()

with open('fashion_products.csv', 'r', newline='', encoding='utf-8') as csvfile:
    csv_reader = csv.DictReader(csvfile)
    for row in csv_reader:
        cursor.execute('''
            INSERT INTO products (name, price, brand, category, rating, color, size)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        ''', (
            row['Product Name'],
            float(row['Price']),
            row.get('Brand'),
            row.get('Category'),
            float(row['Rating']) if row.get('Rating') else None,
            row.get('Color'),
            row.get('Size')
        ))

conn.commit()
conn.close()
