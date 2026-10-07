# SmartStock – Inventory & Product Management System

SmartStock is a web-based **Inventory and Product Management System** developed to manage products, stock quantities, categories, and prices efficiently.

The system provides a simple and user-friendly dashboard where users can add, view, search, edit, delete, and update product stock. It also provides automatic low-stock alerts and inventory statistics.

## Features

* Add new products
* View all products
* Search products
* Edit product details
* Delete products
* Update stock quantity
* Automatic low-stock alerts
* Dashboard with inventory statistics
* Calculate total inventory value
* Responsive and professional user interface

## Dashboard

The dashboard displays:

* **Total Products** – Number of products stored in the system
* **Total Stock** – Total quantity of all products
* **Low Stock** – Number of products with quantity below 5
* **Inventory Value** – Total value of available inventory

## Technologies Used

### Frontend

* HTML
* CSS
* JavaScript

### Backend

* Python
* Flask

### Database

* SQLite

## Project Structure

```text
SmartStock/
│
├── app.py
├── inventory.db
│
├── templates/
│   └── index.html
│
└── static/
    ├── style.css
    └── script.js
```

## How It Works

1. The user enters product details such as name, category, quantity, and price.
2. JavaScript sends the product data to the Flask backend.
3. Flask processes the request and stores the data in the SQLite database.
4. Product information can be viewed and searched from the web interface.
5. Users can edit or delete existing products.
6. Stock quantities can be updat
