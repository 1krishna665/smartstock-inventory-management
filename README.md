# SmartStock – Inventory & Product Management System

SmartStock is a web-based **Inventory and Product Management System** designed to manage products, stock quantities, categories, and prices efficiently.

## Features

* Add, view, search, edit, and delete products
* Update stock quantity
* Automatic low-stock alerts
* Dashboard with inventory statistics
* Total inventory value calculation
* Responsive and professional UI

## Technologies Used

* **Frontend:** HTML, CSS, JavaScript
* **Backend:** Python, Flask
* **Database:** SQLite

## Project Structure

```text
SmartStock/
├── app.py
├── inventory.db
├── templates/
│   └── index.html
└── static/
    ├── style.css
    └── script.js
```

## How It Works

1. User enters product details through the web interface.
2. JavaScript sends the data to the Flask backend.
3. Flask stores and manages the data in SQLite.
4. Users can view, search, edit, delete, and update stock.
5. The dashboard displays inventory statistics and low-stock alerts.

## API Operations

| Method | Endpoint                   | Purpose        |
| ------ | -------------------------- | -------------- |
| POST   | `/api/products`            | Add product    |
| GET    | `/api/products`            | View products  |
| PUT    | `/api/products/<id>`       | Edit product   |
| DELETE | `/api/products/<id>`       | Delete product |
| PUT    | `/api/products/<id>/stock` | Update stock   |

## Installation

```bash
git clone https://github.com/your-username/smartstock-inventory-management.git
cd smartstock-inventory-management
pip install flask
python app.py
```

Then open:

```text
http://127.0.0.1:5000
```

## Database

SmartStock uses **SQLite** with a `products` table containing:

`id`, `name`, `category`, `quantity`, and `price`.

## Future Improvements

* User authentication
* Category filtering
* Inventory reports
* Export data
* Supplier management

## Conclusion

SmartStock demonstrates a complete full-stack inventory management application using **HTML, CSS, JavaScript, Flask, and SQLite**.
