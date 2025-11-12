// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function () {
    const mobileMenu = document.getElementById('mobile-menu');
    const rightNav = document.querySelector('.right-nav');

    if (mobileMenu) {
        mobileMenu.addEventListener('click', function () {
            this.classList.toggle('active');
            rightNav.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.right-nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                mobileMenu.classList.remove('active');
                rightNav.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function (event) {
            const isClickInsideNav = rightNav.contains(event.target);
            const isClickOnToggle = mobileMenu.contains(event.target);

            if (!isClickInsideNav && !isClickOnToggle && rightNav.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                rightNav.classList.remove('active');
            }
        });
    }
});

// Add to Cart Functionality
function addToCart(productName, price, image) {
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

    // Store cart item in sessionStorage
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

// Initialize cart count on page load
document.addEventListener('DOMContentLoaded', function () {
    updateCartCount();
});

// Contact Form Submission
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        // Create WhatsApp message
        const whatsappMessage = `Hi, I'm ${name}%0A%0AEmail: ${email}%0APhone: ${phone}%0ASubject: ${subject}%0A%0AMessage: ${message}`;

        // Redirect to WhatsApp
        window.open(`https://wa.me/2347012357572?text=${whatsappMessage}`, '_blank');

        // Reset form
        contactForm.reset();

        // Show success message
        alert('Thank you! Your message will be sent via WhatsApp.');
    });
}

// Smooth Scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all product cards and info cards
document.addEventListener('DOMContentLoaded', function () {
    const animatedElements = document.querySelectorAll('.product-card, .w-j, .info-card, .mission-card, .offer-item, .reason');

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
});