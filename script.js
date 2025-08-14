// ------------------------
// Initialize Cart for the Session
// ------------------------
if (!localStorage.getItem("cart")) {
    localStorage.setItem("cart", JSON.stringify([]));
}
sessionStorage.setItem("sessionCartInitialized", "true");

// ------------------------
// Cart Counter
// ------------------------
function updateCartCounter() {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const counter = document.querySelector(".cart-counter");
    if (counter) counter.textContent = cart.length;
}

// ------------------------
// Logo Navigation
// ------------------------
document.addEventListener("DOMContentLoaded", () => {
    const logo = document.querySelector("header h1");
    if (logo) {
        logo.addEventListener("click", () => {
            window.location.href = "index.html";
        });
    }
    updateCartCounter();
    updateShipmentWelcome();
});

// ------------------------
// Login / Sign-up
// ------------------------
function saveLogin() {
    const name = document.getElementById("name")?.value.trim();
    const address = document.getElementById("address")?.value.trim();

    if (!name || !address) {
        alert("Please enter your name and address.");
        return;
    }

    localStorage.setItem("user", JSON.stringify({ name, address }));
    window.location.href = "shipments.html";
}

// ------------------------
// Shipment Page Functions
// ------------------------
function addShipment() {
    const supplierPhone = document.getElementById("supplierPhone")?.value.trim();
    const supplierInstagram = document.getElementById("supplierInstagram")?.value.trim();
    const weight = parseFloat(document.getElementById("weight")?.value);

    if (!supplierPhone || !supplierInstagram || isNaN(weight)) {
        alert("Please fill in all fields.");
        return;
    }

    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    cart.push({ supplierPhone, supplierInstagram, weight });
    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCounter();

    // Clear form fields
    document.getElementById("supplierPhone").value = "";
    document.getElementById("supplierInstagram").value = "";
    document.getElementById("weight").value = "";
}

function goToCheckout() {
    window.location.href = "cart.html";
}

// Update welcome text for logged-in users
function updateShipmentWelcome() {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (user) {
        const welcomeText = document.getElementById("welcomeText");
        if (welcomeText) {
            welcomeText.textContent = `Hi ${user.name}, Add Shipment`;
        }
    }
}

// ------------------------
// Cart Page Functions
// ------------------------
function displayCart() {
    const cartList = document.getElementById("cartList");
    if (!cartList) return;

    let cart = JSON.parse(localStorage.getItem("cart") || "[]");
    cartList.innerHTML = "";
    let totalWeight = 0;

    if (cart.length === 0) {
        cartList.innerHTML = "<p>No shipments in cart.</p>";
        const totalCost = document.getElementById("totalCost");
        if (totalCost) totalCost.textContent = "";
        return;
    }

    cart.forEach((item, idx) => {
        totalWeight += item.weight;
        const div = document.createElement("div");
        div.className = "card";
        div.innerHTML = `
            <p><b>Supplier Phone:</b> ${item.supplierPhone}</p>
            <p><b>Instagram:</b> ${item.supplierInstagram}</p>
            <p><b>Weight:</b> ${item.weight} kg</p>
            <button style="background-color:#333;color:#00ff88;" onclick="deleteItem(${idx})">Delete</button>
        `;
        cartList.appendChild(div);
    });

    const estimatedCost = totalWeight * 5; // example cost calculation
    const totalCost = document.getElementById("totalCost");
    if (totalCost) totalCost.textContent = `Estimated Shipping Cost: $${estimatedCost.toFixed(2)}`;
}

function deleteItem(index) {
    let cart = JSON.parse(localStorage.getItem("cart") || "[]");
    if (confirm("Remove this shipment from the cart?")) {
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        displayCart();
        updateCartCounter();
    }
}

function confirmOrder() {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }
    // Empty cart after “payment”
    localStorage.setItem("cart", JSON.stringify([]));
    window.location.href = "confirmation.html";
}

// ------------------------
// Confirmation Page Reminder
// ------------------------
function showLoginReminder() {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    const reminderDiv = document.getElementById("loginReminder");
    if (!user && reminderDiv) {
        reminderDiv.innerHTML = `<p>Please <a href="login.html" style="color:#00ff88">log in</a> to save your details for future shipments.</p>`;
    }
}
