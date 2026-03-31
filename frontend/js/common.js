// Common JavaScript functions for all pages
const API_BASE_URL = 'http://localhost:8080';

// Check if user is logged in
function checkAuth() {
    const userId = localStorage.getItem('userId');
    const currentPage = window.location.pathname.split('/').pop();
    
    if (!userId && currentPage !== 'login.html' && currentPage !== 'signup.html') {
        window.location.href = 'login.html';
    }
}

// Update cart count in navbar
async function updateCartCount() {
    const userId = localStorage.getItem('userId');
    if (!userId) return;
    
    try {
        const response = await fetch(`${API_BASE_URL}/cart/${userId}`);
        const cartItems = await response.json();
        const count = cartItems.reduce((sum, item) => sum + item.quantity, 0);
        const cartBadges = document.querySelectorAll('#cartCount');
        cartBadges.forEach(badge => {
            if (badge) badge.textContent = count;
        });
    } catch (error) {
        console.error('Error updating cart count:', error);
    }
}

// Logout function
function logout() {
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    window.location.href = 'login.html';
}

// Add to cart function
async function addToCart(productId, quantity = 1) {
    const userId = localStorage.getItem('userId');
    if (!userId) {
        alert('Please login to add items to cart');
        window.location.href = 'login.html';
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/cart/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: parseInt(userId),
                productId: productId,
                quantity: quantity
            })
        });
        
        if (response.ok) {
            updateCartCount();
            showNotification('Item added to cart successfully!', 'success');
        } else {
            showNotification('Failed to add item to cart', 'error');
        }
    } catch (error) {
        console.error('Error adding to cart:', error);
        showNotification('Error adding item to cart', 'error');
    }
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        padding: 12px 20px;
        background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        border-radius: 8px;
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Add CSS animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// Initialize common functionality
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    updateCartCount();
    
    // Setup logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            logout();
        });
    }
});