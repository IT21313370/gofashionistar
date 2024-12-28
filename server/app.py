import requests
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import sqlite3

HUGGING_FACE_API_URL = "https://api-inference.huggingface.co/models/google/t5-small-ssm-nq"

HUGGING_FACE_API_TOKEN = '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'


app = Flask(__name__)
CORS(app)

DATABASE = "database.db"

def get_db_connection():
    try:
        conn = sqlite3.connect(DATABASE)
        conn.row_factory = sqlite3.Row
        return conn
    except sqlite3.Error as e:
        print(f"Database connection error: {e}")
        return None


@app.route("/api/query", methods=["POST"])
def query_database():
    data = request.json
    question = data.get("question", "").lower()  # Convert question to lowercase for intent detection

    # Intent detection and query assignment
    if "price" in question:
        query = "SELECT name, price FROM products"
        context = "Here are some products and their prices."
    elif "rating" in question:
        query = "SELECT name, rating FROM products"
        context = "Here are some products with their ratings."
    elif "recommend" in question or "best" in question:
        query = "SELECT name, price, rating FROM products ORDER BY rating DESC LIMIT 5"
        context = "These are some highly-rated products you may like."
    else:
        query = "SELECT name, price, rating FROM products"
        context = "Here is a list of products and their details."

    # Fetch product data from the database
    conn = get_db_connection()
    products = conn.execute(query).fetchall()
    conn.close()

    # Format the results
    results = [dict(row) for row in products]
    if results:
        formatted_results = "\n".join(
            [f"- {p['name']}: ${p.get('price', 'N/A')}, Rating: {p.get('rating', 'N/A')}" for p in results]
        )
    else:
        formatted_results = "No matching products found."

    # Generate conversational response using Hugging Face
    response = requests.post(
        HUGGING_FACE_API_URL,
        headers={"Authorization": f"Bearer {HUGGING_FACE_API_TOKEN}"},
        json={"inputs": f"{context}\n\n{formatted_results}\n\nUser Question: {question}"}
    )
    bot_response = response.json().get("generated_text", "I'm sorry, I couldn't understand that.")

    # Combine the generated response with product details
    if results:
        combined_response = f"{bot_response}\n\nProduct Details:\n{formatted_results}"
    else:
        combined_response = bot_response

    return jsonify({"bot_response": combined_response})



@app.route('/api/category-distribution', methods=['GET'])
def get_category_distribution():
    conn = get_db_connection()
    if conn is None:
        return jsonify({'error': 'Failed to connect to the database'}), 500

    try:
        category_count = conn.execute('''
            SELECT category, COUNT(*) AS count
            FROM products
            GROUP BY category
        ''').fetchall()
        return jsonify([dict(row) for row in category_count])
    except sqlite3.Error as e:
        return jsonify({'error': f'Database query error: {e}'}), 500
    finally:
        conn.close()

@app.route('/api/brand-distribution', methods=['GET'])
def get_brand_distribution():
    conn = get_db_connection()
    if conn is None:
        return jsonify({'error': 'Failed to connect to the database'}), 500

    try:
        brand_count = conn.execute('''
            SELECT brand, COUNT(*) AS count
            FROM products
            GROUP BY brand
        ''').fetchall()
        return jsonify([dict(row) for row in brand_count])
    except sqlite3.Error as e:
        return jsonify({'error': f'Database query error: {e}'}), 500
    finally:
        conn.close()




@app.route('/api/price-distribution', methods=['GET'])
def get_price_distribution():
    conn = get_db_connection()
    if conn is None:
        return jsonify({'error': 'Failed to connect to the database'}), 500

    try:
        prices = conn.execute('''
            SELECT price
            FROM products
        ''').fetchall()
        return jsonify([row['price'] for row in prices])
    except sqlite3.Error as e:
        return jsonify({'error': f'Database query error: {e}'}), 500
    finally:
        conn.close()

@app.route('/api/average-ratings', methods=['GET'])
def get_average_ratings():
    conn = get_db_connection()
    if conn is None:
        return jsonify({'error': 'Failed to connect to the database'}), 500

    try:
        category_ratings = conn.execute('''
            SELECT category, AVG(rating) AS avg_rating
            FROM products
            GROUP BY category
        ''').fetchall()
        return jsonify([dict(row) for row in category_ratings])
    except sqlite3.Error as e:
        return jsonify({'error': f'Database query error: {e}'}), 500
    finally:
        conn.close()


@app.route('/api/search-products', methods=['GET'])
def search_products():
    conn = get_db_connection()
    if conn is None:
        return jsonify({'error': 'Failed to connect to the database'}), 500

    name = request.args.get('name', '')
    min_price = request.args.get('min_price', 0)
    max_price = request.args.get('max_price', float('inf'))

    query = "SELECT * FROM products WHERE name LIKE ? AND price BETWEEN ? AND ?"
    params = [f"%{name}%", min_price, max_price]

    try:
        products = conn.execute(query, params).fetchall()
        return jsonify([dict(row) for row in products])
    except sqlite3.Error as e:
        return jsonify({'error': f'Database query error: {e}'}), 500
    finally:
        conn.close()

@app.route('/api/total-products', methods=['GET'])
def total_products():
    conn = get_db_connection()
    if conn is None:
        return jsonify({'error': 'Failed to connect to the database'}), 500
    try:
        total = conn.execute('SELECT COUNT(*) AS total_products FROM products').fetchone()
        return jsonify({'total_products': total['total_products']})
    except sqlite3.Error as e:
        return jsonify({'error': f'Database query error: {e}'}), 500
    finally:
        conn.close()

@app.route('/api/in-stock-categories', methods=['GET'])
def in_stock_categories():
    conn = get_db_connection()
    if conn is None:
        return jsonify({'error': 'Failed to connect to the database'}), 500
    try:
        result = conn.execute('''
            SELECT COUNT(DISTINCT category) AS in_stock_category_count
            FROM products
            WHERE quantity > 0
        ''').fetchone()
        in_stock_category_count = result['in_stock_category_count'] if result else 0
        return jsonify({'in_stock_category_count': in_stock_category_count})
    except sqlite3.Error as e:
        return jsonify({'error': f'Database query error: {e}'}), 500
    finally:
        conn.close()

@app.route('/api/out-of-stock-products', methods=['GET'])
def out_of_stock_products():
    conn = get_db_connection()
    if conn is None:
        return jsonify({'error': 'Failed to connect to the database'}), 500
    try:
        out_of_stock_count = conn.execute('''
            SELECT COUNT(*) AS out_of_stock_count
            FROM products
            WHERE quantity = 0
        ''').fetchone()
        return jsonify({'out_of_stock_count': out_of_stock_count['out_of_stock_count']})
    except sqlite3.Error as e:
        return jsonify({'error': f'Database query error: {e}'}), 500
    finally:
        conn.close()

@app.route('/api/on-sale-products', methods=['GET'])
def on_sale_products():
    conn = get_db_connection()
    if conn is None:
        return jsonify({'error': 'Failed to connect to the database'}), 500
    try:
        result = conn.execute('''
            SELECT COUNT(DISTINCT name) AS in_stock_count
            FROM products
            WHERE quantity > 0
        ''').fetchone()
        in_stock_count = result['in_stock_count'] if result else 0
        return jsonify({'in_stock_count': in_stock_count})
    except sqlite3.Error as e:
        return jsonify({'error': f'Database query error: {e}'}), 500
    finally:
        conn.close()

@app.route('/api/orders', methods=['POST'])
def create_order():
    data = request.get_json()
    product_id = data.get('product_id')
    customer_name = data.get('customer_name')
    customer_address = data.get('customer_address')
    discount = data.get('discount', 0)
    product_count = data.get('product_count', 1)

    conn = get_db_connection()
    if conn is None:
        return jsonify({'error': 'Failed to connect to the database'}), 500

    try:
        cur = conn.cursor()
        cur.execute('SELECT id, price, stock FROM products WHERE id = ?', (product_id,))
        product = cur.fetchone()
        if not product:
            return jsonify({'error': 'Product not found'}), 404

        product_id, price, stock = product

        if stock < product_count:
            return jsonify({'error': 'Insufficient stock'}), 400

        total_price = price * product_count * (1 - discount / 100)

        cur.execute('''
            INSERT INTO sales (product_id, customer_name, customer_address, quantity, total_price)
            VALUES (?, ?, ?, ?, ?)
        ''', (product_id, customer_name, customer_address, product_count, total_price))

        cur.execute('UPDATE products SET stock = stock - ? WHERE id = ?', (product_count, product_id))

        conn.commit()
        return jsonify({'message': 'Order placed successfully'}), 201
    except sqlite3.Error as e:
        conn.rollback()
        return jsonify({'error': f'Database error: {e}'}), 500
    finally:
        conn.close()

@app.route('/products', methods=['GET'])
def get_products():
    conn = get_db_connection()
    if conn is None:
        return jsonify({'error': 'Failed to connect to the database'}), 500
    try:
        products = conn.execute('SELECT * FROM products').fetchall()
        return jsonify([dict(row) for row in products])
    except sqlite3.Error as e:
        return jsonify({'error': f'Database query error: {e}'}), 500
    finally:
        conn.close()

@app.route('/products', methods=['POST'])
def add_product():
    data = request.json
    required_fields = ['name', 'price', 'quantity', 'on_sale']
    if not all(field in data for field in required_fields):
        return jsonify({'error': f'Missing required fields: {", ".join(required_fields)}'}), 400

    conn = get_db_connection()
    if conn is None:
        return jsonify({'error': 'Failed to connect to the database'}), 500
    try:
        conn.execute(
            '''INSERT INTO products (name, price, brand, category, rating, color, size, quantity, on_sale)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)''',
            (
                data['name'],
                data['price'],
                data.get('brand'),
                data.get('category'),
                data.get('rating'),
                data.get('color'),
                data.get('size'),
                data['quantity'],
                data['on_sale']
            )
        )
        conn.commit()
        return jsonify({'message': 'Product added successfully'}), 201
    except sqlite3.Error as e:
        return jsonify({'error': f'Database insertion error: {e}'}), 500
    finally:
        conn.close()

@app.route('/products/<int:product_id>', methods=['PUT'])
def update_product(product_id):
    data = request.json
    required_fields = ['name', 'price', 'quantity', 'on_sale']
    if not all(field in data for field in required_fields):
        return jsonify({'error': f'Missing required fields: {", ".join(required_fields)}'}), 400

    conn = get_db_connection()
    if conn is None:
        return jsonify({'error': 'Failed to connect to the database'}), 500
    try:
        conn.execute(
            '''UPDATE products
               SET name = ?, price = ?, brand = ?, category = ?, rating = ?, color = ?, size = ?, quantity = ?, on_sale = ?
               WHERE id = ?''',
            (
                data['name'],
                data['price'],
                data.get('brand'),
                data.get('category'),
                data.get('rating'),
                data.get('color'),
                data.get('size'),
                data['quantity'],
                data['on_sale'],
                product_id
            )
        )
        conn.commit()
        return jsonify({'message': 'Product updated successfully'})
    except sqlite3.Error as e:
        return jsonify({'error': f'Database update error: {e}'}), 500
    finally:
        conn.close()

@app.route('/products/<int:product_id>', methods=['DELETE'])
def delete_product(product_id):
    conn = get_db_connection()
    if conn is None:
        return jsonify({'error': 'Failed to connect to the database'}), 500
    try:
        conn.execute('DELETE FROM products WHERE id = ?', (product_id,))
        conn.commit()
        return jsonify({'message': 'Product deleted successfully'})
    except sqlite3.Error as e:
        return jsonify({'error': f'Database deletion error: {e}'}), 500
    finally:
        conn.close()

@app.errorhandler(404)
def not_found_error(error):
    return render_template('404.html'), 404

if __name__ == '__main__':
    app.run(debug=True)
