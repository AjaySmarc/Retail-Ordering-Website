let cartItems = [];

async function loadCart() {
    const userId = localStorage.getItem('userId');
    if (!userId) return;
    
    try {
        const response = await fetch(`${API_BASE_URL}/cart/${userId}`);
        cartItems = await response.json();
        displayCart();
    } catch (error) {
        console.error('Error loading cart:', error);
    }
}

async function displayCart() {
    const cartContainer = document.getElementById('cartItems');
    const menuResponse = await fetch(`${API_BASE_URL}/menu`);
    const menuItems = await menuResponse.json();
    
    if (cartItems.length === 0) {
        cartContainer.innerHTML = '<div class="empty-cart"><p>Your cart is empty</p><a href="menu.html" class="btn btn-primary">Browse Menu</a></div>';
        updateSummary(0);
        return;
    }
    
    cartContainer.innerHTML = cartItems.map(item => {
        const menuItem = menuItems.find(m => m.id === item.productId);
        const itemTotal = item.price * item.quantity;
        return `
            <div class="cart-item" data-id="${item.id}">
                <div class="cart-item-image">
                    <i class="fas fa-pizza-slice"></i>
                </div>
                <div class="cart-item-details">
                    <h4>${menuItem ? menuItem.name : 'Item'}</h4>
                    <p class="item-price">$${item.price.toFixed(2)} each</p>
                </div>
                <div class="cart-item-quantity">
                    <button onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
                <div class="cart-item-total">
                    $${itemTotal.toFixed(2)}
                </div>
                <i class="fas fa-trash remove-item" onclick="removeFromCart(${item.id})"></i>
            </div>
        `;
    }).join('');
    
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    updateSummary(subtotal);
}

function updateSummary(subtotal) {
    const tax = subtotal * 0.10;
    const deliveryFee = 2.99;
    const total = subtotal + tax + deliveryFee;
    
    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;
}

async function updateQuantity(cartItemId, delta) {
    const item = cartItems.find(i => i.id === cartItemId);
    if (!item) return;
    
    const newQuantity = item.quantity + delta;
    if (newQuantity < 1) {
        await removeFromCart(cartItemId);
        return;
    }
    
    // For simplicity, we'll remove and re-add with new quantity
    // In production, you'd have a proper update endpoint
    const userId = localStorage.getItem('userId');
    try {
        await fetch(`${API_BASE_URL}/cart/${userId}/${cartItemId}`, { method: 'DELETE' });
        await addToCart(item.productId, delta);
        loadCart();
    } catch (error) {
        console.error('Error updating quantity:', error);
    }
}

async function removeFromCart(cartItemId) {
    const userId = localStorage.getItem('userId');
    try {
        await fetch(`${API_BASE_URL}/cart/${userId}/${cartItemId}`, { method: 'DELETE' });
        loadCart();
        updateCartCount();
        showNotification('Item removed from cart', 'success');
    } catch (error) {
        console.error('Error removing item:', error);
        showNotification('Error removing item', 'error');
    }
}

document.getElementById('clearCartBtn')?.addEventListener('click', async () => {
    const userId = localStorage.getItem('userId');
    if (confirm('Are you sure you want to clear your cart?')) {
        try {
            await fetch(`${API_BASE_URL}/cart/clear/${userId}`, { method: 'DELETE' });
            loadCart();
            updateCartCount();
            showNotification('Cart cleared', 'success');
        } catch (error) {
            console.error('Error clearing cart:', error);
            showNotification('Error clearing cart', 'error');
        }
    }
});

document.getElementById('checkoutBtn')?.addEventListener('click', async () => {
    if (cartItems.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    const userId = localStorage.getItem('userId');
    try {
        const response = await fetch(`${API_BASE_URL}/order/place`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: parseInt(userId) })
        });
        
        if (response.ok) {
            const order = await response.json();
            localStorage.setItem('lastOrder', JSON.stringify(order));
            window.location.href = 'order-success.html';
        } else {
            alert('Failed to place order. Please try again.');
        }
    } catch (error) {
        console.error('Error placing order:', error);
        alert('Error placing order');
    }
});

// Load cart on page load
loadCart();