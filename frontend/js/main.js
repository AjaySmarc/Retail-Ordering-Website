// API Configuration
const API_BASE_URL = 'http://localhost:8080';

// Cart Management
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Update cart count in UI
function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

// Add to cart function
function addToCart(item) {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: 1
        });
    }
    
    saveCart();
    showToast(`${item.name} added to cart!`);
}

// Show toast notification
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    if (toast) {
        toast.textContent = message;
        toast.style.backgroundColor = type === 'success' ? '#27ae60' : '#e74c3c';
        toast.style.display = 'block';
        
        setTimeout(() => {
            toast.style.display = 'none';
        }, 3000);
    }
}

// Check if user is logged in
function isLoggedIn() {
    return localStorage.getItem('user') !== null;
}

// Get current user
function getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
}

// Update UI based on login status
function updateUIForLoginStatus() {
    const isLoggedInUser = isLoggedIn();
    const user = getCurrentUser();
    
    // On home page (index.html)
    const homeUserActions = document.getElementById('userActions');
    if (homeUserActions) {
        if (isLoggedInUser) {
            homeUserActions.innerHTML = `
                <div class="user-menu">
                    <i class="fas fa-user-circle"></i>
                    <span>Welcome, ${user?.name || 'User'}</span>
                    <a href="#" id="logoutBtn">Logout</a>
                </div>
            `;
        } else {
            homeUserActions.innerHTML = `
                <a href="login.html" class="btn-login">Login</a>
                <a href="signup.html" class="btn-signup">Sign Up</a>
            `;
        }
    }
    
    // On protected pages (menu, cart, order-success)
    const userMenu = document.getElementById('userMenu');
    const userName = document.getElementById('userName');
    if (userMenu && userName) {
        if (isLoggedInUser) {
            userMenu.style.display = 'flex';
            userName.textContent = `Welcome, ${user?.name || 'User'}`;
        } else {
            // Redirect to login if not logged in
            if (!window.location.pathname.includes('login.html') && 
                !window.location.pathname.includes('signup.html') &&
                !window.location.pathname.includes('index.html')) {
                window.location.href = 'login.html';
            }
        }
    }
    
    // Setup logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            logout();
        });
    }
}

// Logout function
function logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
    showToast('Logged out successfully!');
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    updateUIForLoginStatus();
    updateCartCount();
});