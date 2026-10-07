from flask import Flask, render_template, request, jsonify
import sqlite3

app = Flask(__name__)


# Connect to database
def get_db_connection():
    conn = sqlite3.connect("inventory.db")
    conn.row_factory = sqlite3.Row
    return conn


# Create database table
def create_table():
    conn = get_db_connection()

    conn.execute("""
        CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            category TEXT NOT NULL,
            quantity INTEGER NOT NULL,
            price REAL NOT NULL
        )
    """)

    conn.commit()
    conn.close()


# Home page
@app.route("/")
def home():
    return render_template("index.html")


# Add product
@app.route("/api/products", methods=["POST"])
def add_product():

    data = request.get_json()

    name = data["name"]
    category = data["category"]
    quantity = data["quantity"]
    price = data["price"]

    conn = get_db_connection()

    conn.execute("""
        INSERT INTO products (name, category, quantity, price)
        VALUES (?, ?, ?, ?)
    """, (name, category, quantity, price))

    conn.commit()
    conn.close()

    return jsonify({"message": "Product added successfully"})


# View all products
@app.route("/api/products", methods=["GET"])
def get_products():

    conn = get_db_connection()

    products = conn.execute(
        "SELECT * FROM products"
    ).fetchall()

    conn.close()

    return jsonify([dict(product) for product in products])


# Update product
@app.route("/api/products/<int:id>", methods=["PUT"])
def update_product(id):

    data = request.get_json()

    name = data["name"]
    category = data["category"]
    quantity = data["quantity"]
    price = data["price"]

    conn = get_db_connection()

    conn.execute("""
        UPDATE products
        SET name = ?, category = ?, quantity = ?, price = ?
        WHERE id = ?
    """, (name, category, quantity, price, id))

    conn.commit()
    conn.close()

    return jsonify({"message": "Product updated successfully"})


# Delete product
@app.route("/api/products/<int:id>", methods=["DELETE"])
def delete_product(id):

    conn = get_db_connection()

    conn.execute(
        "DELETE FROM products WHERE id = ?",
        (id,)
    )

    conn.commit()
    conn.close()

    return jsonify({"message": "Product deleted successfully"})


# Update stock
@app.route("/api/products/<int:id>/stock", methods=["PUT"])
def update_stock(id):

    data = request.get_json()

    quantity = data["quantity"]

    conn = get_db_connection()

    conn.execute("""
        UPDATE products
        SET quantity = ?
        WHERE id = ?
    """, (quantity, id))

    conn.commit()
    conn.close()

    return jsonify({"message": "Stock updated successfully"})


# Start Flask
if __name__ == "__main__":
    create_table()
    app.run(debug=True)