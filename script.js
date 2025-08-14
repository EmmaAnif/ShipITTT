// -------------------- Global Variables --------------------
let cart = []; // Cart starts empty for each session
let isLoggedIn = false;
let currentUser = null;

// -------------------- Login / Signup --------------------
function loginUser(name) {
    currentUser = { name };
    isLoggedIn = true;
    alert(`Welcome, ${name}!`);
    updateHeader();
}

function updateHeader() {
    const userDisplay = document.getElementById('user-display');
    if (userDisplay) {
        userDisplay.textContent = isLoggedIn ? `Hello, ${currentUser.name}` : '';
    }
    updateCartCounter();
}

// -------------------- Cart Functions --------------------
function addToCart(shipment) {
    cart.push(shipment);
    updateCartCounter();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartCounter();
    renderCartItems();
}

function updateCartCounter() {
    const counter = document.getElementById('cart-counter');
    if (counter) counter.textContent = cart.length;
}

// -------------------- Render Cart on Checkout --------------------
function renderCartItems() {
    const container = document.getElementById('cart-items');
    if (!container) return;
    container.innerHTML = ''; // clear existing

    if (cart.length === 0) {
        container.innerHTML = '<p>Your cart is empty.</p>';
        updateEstimatedCost();
        return;
    }

    cart.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <p><strong>Supplier:</strong> ${item.supplierName || 'N/A'}</p>
            <p><strong>Phone:</strong> ${item.phone || 'N/A'}</p>
            <p><strong>Instagram:</strong> ${item.instagram || 'N/A'}</p>
            <p><strong>Weight:</strong> ${item.weight || 'N/A'} kg</p>
            <button onclick="removeFromCart(${index})">Remove</button>
        `;
        container.appendChild(card);
    });

    updateEstimatedCost();
}

// -------------------- Estimate Shipping Cost --------------------
function updateEstimatedCost() {
    const costContainer = document.getElementById('estimated-cost');
    if (!costContainer) return;

    let totalWeight = cart.reduce((sum, item) => sum + (parseFloat(item.weight) || 0), 0);
    const baseRate = 10; // $10 per kg for demo
    const estimated = totalWeight * baseRate;
    costContainer.textContent = `$${estimated.toFixed(2)} (Estimated)`;
}

// -------------------- Checkout / Payment --------------------
function proceedToCheckout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    renderCartItems();
    alert('Proceeding to checkout...');
}

function makePayment() {
    if (cart.length === 0) {
        alert('No items to pay for.');
        return;
    }

    alert('Payment successful!');
    cart = []; // clear cart
    updateCartCounter();
    renderCartItems();

    // Prompt sign-up if not logged in
    if (!isLoggedIn) {
        promptSignupAfterPayment();
    }
}

// -------------------- Post-Payment Signup --------------------
function promptSignupAfterPayment() {
    const container = document.getElementById('signup-prompt');
    if (!container) return;

    container.innerHTML = `
        <h3>Create an account to track your shipment</h3>
        <input type="text" id="signup-name" placeholder="Your Name" />
        <input type="password" id="signup-password" placeholder="Password" />
        <button onclick="completeSignup()">Sign Up</button>
    `;
}

function completeSignup() {
    const name = document.getElementById('signup-name').value;
    const password = document.getElementById('signup-password').value;

    if (!name || !password) {
        alert('Please fill in all fields.');
        return;
    }

    loginUser(name); // simple browser-only login
    alert('Account created! You are now logged in.');
    const container = document.getElementById('signup-prompt');
    if (container) container.innerHTML = '';
}
