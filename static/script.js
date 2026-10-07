const productForm = document.getElementById("productForm");


// Add Product
productForm.addEventListener("submit", async function(event) {

    event.preventDefault();

    const name = document.getElementById("name").value;
    const category = document.getElementById("category").value;
    const quantity = document.getElementById("quantity").value;
    const price = document.getElementById("price").value;

    const response = await fetch("/api/products", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            name: name,
            category: category,
            quantity: quantity,
            price: price
        })

    });

    const data = await response.json();

    document.getElementById("message").textContent = data.message;

    productForm.reset();

});


// View Products
async function loadProducts() {

    const response = await fetch("/api/products");

    const products = await response.json();


        // Dashboard calculations
    let totalStock = 0;
    let lowStock = 0;
    let inventoryValue = 0;

    products.forEach(function(product) {

        totalStock += product.quantity;

        if (product.quantity < 5) {
            lowStock++;
        }

        inventoryValue += product.quantity * product.price;

    });

    document.getElementById("totalProducts").textContent = products.length;

    document.getElementById("totalStock").textContent = totalStock;

    document.getElementById("lowStock").textContent = lowStock;

    document.getElementById("inventoryValue").textContent =
        "₹" + inventoryValue.toFixed(2);


    const table = document.getElementById("productTable");

    table.innerHTML = "";

    products.forEach(function(product) {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.category}</td>
            <td>${product.quantity}</td>
            <td>₹${product.price}</td>

            <td>
                ${
                    product.quantity < 5
                    ? "⚠️ Low Stock"
                    : "Available"
                }
            </td>

            <td>
                <button class="edit-btn">Edit</button>
                <button class="stock-btn">Update Stock</button>
                <button class="delete-btn">Delete</button>
            </td>
        `;


        // Edit button
        row.querySelector(".edit-btn").addEventListener("click", function() {

            editProduct(
                product.id,
                product.name,
                product.category,
                product.quantity,
                product.price
            );

        });


        // Update Stock button
        row.querySelector(".stock-btn").addEventListener("click", function() {

            updateStock(
                product.id,
                product.quantity
            );

        });


        // Delete button
        row.querySelector(".delete-btn").addEventListener("click", function() {

            deleteProduct(product.id);

        });


        table.appendChild(row);

    });

}


// Search Products
function searchProducts() {

    const searchText = document
        .getElementById("searchInput")
        .value
        .toLowerCase();

    const rows = document
        .getElementById("productTable")
        .getElementsByTagName("tr");

    for (let i = 0; i < rows.length; i++) {

        const rowText = rows[i].textContent.toLowerCase();

        if (rowText.includes(searchText)) {
            rows[i].style.display = "";
        } else {
            rows[i].style.display = "none";
        }

    }

}


// Edit Product
async function editProduct(id, name, category, quantity, price) {

    const newName = prompt("Enter product name:", name);

    if (newName === null) {
        return;
    }

    const newCategory = prompt("Enter category:", category);

    if (newCategory === null) {
        return;
    }

    const newQuantity = prompt("Enter quantity:", quantity);

    if (newQuantity === null) {
        return;
    }

    const newPrice = prompt("Enter price:", price);

    if (newPrice === null) {
        return;
    }


    const response = await fetch(`/api/products/${id}`, {

        method: "PUT",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            name: newName,
            category: newCategory,
            quantity: Number(newQuantity),
            price: Number(newPrice)
        })

    });


    const data = await response.json();

    alert(data.message);

    loadProducts();

}


// Delete Product
async function deleteProduct(id) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) {
        return;
    }


    const response = await fetch(`/api/products/${id}`, {

        method: "DELETE"

    });


    const data = await response.json();

    alert(data.message);

    loadProducts();

}


// Update Stock
async function updateStock(id, quantity) {

    const newQuantity = prompt(
        "Enter new quantity:",
        quantity
    );

    if (newQuantity === null) {
        return;
    }


    const response = await fetch(`/api/products/${id}/stock`, {

        method: "PUT",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            quantity: Number(newQuantity)
        })

    });


    const data = await response.json();

    alert(data.message);

    loadProducts();

}