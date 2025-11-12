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

    // Update cart count
    updateCartCount();
});

// Change main image when clicking thumbnail
function changeImage(thumbnail) {
    const mainImage = document.getElementById('mainImage');
    mainImage.src = thumbnail.src;

    // Remove active class from all thumbnails
    document.querySelectorAll('.thumbnail').forEach(thumb => {
        thumb.classList.remove('active');
    });

    // Add active class to clicked thumbnail
    thumbnail.classList.add('active');
}

// Add to Cart Functionality
function addToCart(productName, price, image) {
    // Get cart from sessionStorage
    let cart = [];
    const cartData = sessionStorage.getItem('ejluxe_cart');

    if (cartData) {
        cart = JSON.parse(cartData);
    }

    // Check if item already exists
    const existingItem = cart.find(item => item.name === productName);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: productName,
            price: price,
            image: image,
            quantity: 1
        });
    }

    // Save to sessionStorage
    sessionStorage.setItem('ejluxe_cart', JSON.stringify(cart));

    // Show notification
    const notification = document.getElementById('cartNotification');
    const message = document.getElementById('cartMessage');

    if (notification && message) {
        message.textContent = `${productName} added to cart!`;
        notification.classList.add('show');

        // Hide notification after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }

    // Update cart count
    updateCartCount();
}

// Update cart count in navbar
function updateCartCount() {
    const cartData = sessionStorage.getItem('ejluxe_cart');
    let totalItems = 0;

    if (cartData) {
        const cart = JSON.parse(cartData);
        totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    }

    const cartCountElement = document.getElementById('cartCount');
    if (cartCountElement) {
        cartCountElement.textContent = totalItems;
    }
}