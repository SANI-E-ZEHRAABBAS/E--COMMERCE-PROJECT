// Open Side Panel
function openPanel() {
    document.getElementById('sidePanel').style.left = '0';
}

// Close Side Panel
function closePanel() {
    document.getElementById('sidePanel').style.left = '-300px';
}

let cart = [];
let totalPrice = 0;
let cartOpen = false;

// Elements
const cartPanel = document.getElementById("cart");
const cartItems = document.getElementById("cart-items");
const totalPriceElement = document.getElementById("total-price");
const addToCartBtn = document.getElementById("add-to-cart-btn");
const checkoutBtn = document.getElementById("checkout");
const clearCartBtn = document.getElementById("clear-cart");
const closeCartBtn = document.getElementById("close-cart");
const userDetailsBox = document.getElementById("user-details");
const confirmOrderBtn = document.createElement("button");
confirmOrderBtn.innerText = "Confirm Order";
confirmOrderBtn.style.backgroundColor = "red"; // Changed to red
confirmOrderBtn.style.color = "white";

// Add item to cart
addToCartBtn.addEventListener("click", () => {
    const item = {
        name: "Sweatshirt",
        price: 24.99,
        quantity: 1,
    };
    
    cart.push(item);
    updateCart();
    openCart();
});

// Update Cart display
function updateCart() {
    cartItems.innerHTML = "";
    totalPrice = 0;

    cart.forEach((item, index) => {
        totalPrice += item.price * item.quantity;

        const li = document.createElement("li");
        li.innerHTML = `
            ${item.name} - $${item.price.toFixed(2)} x 
            <div class="quantity-controls">
                <button onclick="decreaseQuantity(${index})">-</button>
                <input type="text" value="${item.quantity}" readonly>
                <button onclick="increaseQuantity(${index})">+</button>
            </div>
        `;
        cartItems.appendChild(li);
    });

    totalPriceElement.innerText = totalPrice.toFixed(2);
}

// Increase quantity of an item
function increaseQuantity(index) {
    cart[index].quantity++;
    updateCart();
}

// Decrease quantity of an item
function decreaseQuantity(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    }
    updateCart();
}

// Open cart
function openCart() {
    cartPanel.style.right = "0";
    cartOpen = true;
}

// Close the cart when the cross button is clicked
closeCartBtn.addEventListener("click", () => {
    cartPanel.style.right = "-300px";  // Move the cart out of view
    cartOpen = false;
});

// Clear cart
clearCartBtn.addEventListener("click", () => {
    cart = [];
    updateCart();
});

// Checkout
checkoutBtn.addEventListener("click", () => {
    userDetailsBox.style.display = "block";
    // Show Confirm Order button after user details form is displayed
    userDetailsBox.appendChild(confirmOrderBtn);

    // Add event listener to the Confirm Order button
    confirmOrderBtn.addEventListener("click", () => {
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const address = document.getElementById("address").value;
        const paymentMethod = document.getElementById("payment-method").value;

        if (name && email && address && paymentMethod) {
            alert(`Order Confirmed!\nName: ${name}\nEmail: ${email}\nAddress: ${address}\nPayment Method: ${paymentMethod}\nTotal: $${totalPrice.toFixed(2)}`);

            // Clear cart and close cart after confirmation
            cart = [];
            updateCart();
            cartPanel.style.right = "-300px";
        } else {
            alert("Please fill in all the details.");
        }
    });
});