// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function () {
    const mobileMenu = document.getElementById('mobile-menu');
    const rightNav = document.querySelector('.right-nav');

    if (mobileMenu) {
        mobileMenu.addEventListener('click', function () {
            this.classList.toggle('active');
            rightNav.classList.toggle('active');
        });

        const navLinks = document.querySelectorAll('.right-nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                mobileMenu.classList.remove('active');
                rightNav.classList.remove('active');
            });
        });

        document.addEventListener('click', function (event) {
            const isClickInsideNav = rightNav.contains(event.target);
            const isClickOnToggle = mobileMenu.contains(event.target);

            if (!isClickInsideNav && !isClickOnToggle && rightNav.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                rightNav.classList.remove('active');
            }
        });
    }

    // Load and display cart
    loadCart();
    updateCartCount();
});

// Load cart from sessionStorage
function loadCart() {
    const cart = getCart();
    const cartItemsContainer = document.getElementById('cartItems');
    const emptyCart = document.getElementById('emptyCart');
    const cartSummary = document.getElementById('cartSummary');

    if (cart.length === 0) {
        cartItemsContainer.style.display = 'none';
        emptyCart.style.display = 'block';
        cartSummary.style.display = 'none';
    } else {
        cartItemsContainer.style.display = 'flex';
        emptyCart.style.display = 'none';
        cartSummary.style.display = 'block';
        displayCartItems(cart);
        updateCartSummary(cart);
    }
}

// Get cart from sessionStorage
function getCart() {
    const cartData = sessionStorage.getItem('ejluxe_cart');
    return cartData ? JSON.parse(cartData) : [];
}

// Save cart to sessionStorage
function saveCart(cart) {
    sessionStorage.setItem('ejluxe_cart', JSON.stringify(cart));
}

// Display cart items
function displayCartItems(cart) {
    const cartItemsContainer = document.getElementById('cartItems');
    cartItemsContainer.innerHTML = '';

    cart.forEach((item, index) => {
        const cartItemHTML = `
            <div class="cart-item">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    <p class="cart-item-price">₦${formatPrice(item.price)}</p>
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="decreaseQuantity(${index})">-</button>
                        <span class="quantity-display">${item.quantity}</span>
                        <button class="quantity-btn" onclick="increaseQuantity(${index})">+</button>
                    </div>
                </div>
                <div class="cart-item-actions">
                    <button class="remove-btn" onclick="removeItem(${index})">
                        <i class="fa-solid fa-trash"></i> Remove
                    </button>
                </div>
            </div>
        `;
        cartItemsContainer.innerHTML += cartItemHTML;
    });
}

// Format price with commas
function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Increase quantity
function increaseQuantity(index) {
    const cart = getCart();
    cart[index].quantity += 1;
    saveCart(cart);
    loadCart();
    updateCartCount();
}

// Decrease quantity
function decreaseQuantity(index) {
    const cart = getCart();
    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
        saveCart(cart);
        loadCart();
        updateCartCount();
    }
}

// Remove item
function removeItem(index) {
    const cart = getCart();
    cart.splice(index, 1);
    saveCart(cart);
    loadCart();
    updateCartCount();
}

// Update cart summary
function updateCartSummary(cart) {
    let subtotal = 0;
    cart.forEach(item => {
        subtotal += parseInt(item.price) * item.quantity;
    });

    // const delivery = 2000;
    const total = subtotal;

    document.getElementById('subtotal').textContent = `₦${formatPrice(subtotal)}`;
    // document.getElementById('delivery').textContent = `₦${formatPrice(delivery)}`;
    document.getElementById('total').textContent = `₦${formatPrice(total)}`;
}

// Update cart count in navbar
function updateCartCount() {
    const cart = getCart();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountElement = document.getElementById('cartCount');
    if (cartCountElement) {
        cartCountElement.textContent = totalItems;
    }
}

// Checkout via WhatsApp
document.getElementById('checkoutBtn')?.addEventListener('click', function () {
    const cart = getCart();
    if (cart.length === 0) return;

    let message = 'Hi, I want to order the following items:%0A%0A';
    let subtotal = 0;

    cart.forEach((item, index) => {
        const itemTotal = parseInt(item.price) * item.quantity;
        subtotal += itemTotal;
        message += `${index + 1}. ${item.name}%0A`;
        message += `   Quantity: ${item.quantity}%0A`;
        message += `   Price: ₦${formatPrice(item.price)}%0A`;
        message += `   Subtotal: ₦${formatPrice(itemTotal)}%0A%0A`;
    });

    // const delivery = 2000;
    const total = subtotal;

    message += `Subtotal: ₦${formatPrice(subtotal)}%0A`;
    // message += `Delivery: ₦${formatPrice(delivery)}%0A`;
    message += `Total: ₦${formatPrice(subtotal)}%0A`;

    window.open(`https://wa.me/2347012357572?text=${message}`, '_blank');
});