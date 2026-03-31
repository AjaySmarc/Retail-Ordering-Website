let allMenuItems = [];

async function loadMenu() {
    try {
        const response = await fetch(`${API_BASE_URL}/menu`);
        allMenuItems = await response.json();
        displayMenu(allMenuItems);
    } catch (error) {
        console.error('Error loading menu:', error);
        document.getElementById('menuGrid').innerHTML = '<p>Error loading menu. Please try again later.</p>';
    }
}

function displayMenu(items) {
    const menuGrid = document.getElementById('menuGrid');
    
    if (items.length === 0) {
        menuGrid.innerHTML = '<p>No items found.</p>';
        return;
    }
    
    menuGrid.innerHTML = items.map(item => `
        <div class="menu-item">
            <div class="menu-item-image">
                <i class="fas fa-pizza-slice"></i>
            </div>
            <div class="menu-item-content">
                <h3>${item.name}</h3>
                <p class="description">${item.description || 'Delicious ' + item.name}</p>
                <p class="price">$${item.price.toFixed(2)}</p>
                <p class="stock ${item.stock <= 0 ? 'out-of-stock' : ''}">
                    ${item.stock > 0 ? `In Stock: ${item.stock}` : 'Out of Stock'}
                </p>
                ${item.stock > 0 ? `
                    <div class="menu-item-actions">
                        <div class="quantity-selector">
                            <button onclick="changeQuantity(this, -1)">-</button>
                            <span class="quantity">1</span>
                            <button onclick="changeQuantity(this, 1)">+</button>
                        </div>
                        <button onclick="addToCartFromMenu(${item.id})" class="btn btn-primary btn-small">
                            Add to Cart
                        </button>
                    </div>
                ` : '<button class="btn btn-secondary btn-small" disabled>Out of Stock</button>'}
            </div>
        </div>
    `).join('');
}

function changeQuantity(button, delta) {
    const container = button.parentElement;
    const quantitySpan = container.querySelector('.quantity');
    let quantity = parseInt(quantitySpan.textContent);
    quantity = Math.max(1, Math.min(10, quantity + delta));
    quantitySpan.textContent = quantity;
}

function addToCartFromMenu(productId) {
    const menuItem = document.querySelector(`.menu-item button[onclick="addToCartFromMenu(${productId})"]`);
    const quantitySelector = menuItem.parentElement.querySelector('.quantity-selector');
    const quantity = parseInt(quantitySelector.querySelector('.quantity').textContent);
    addToCart(productId, quantity);
}

// Search and filter functionality
document.getElementById('searchInput')?.addEventListener('input', filterMenu);
document.getElementById('categoryFilter')?.addEventListener('change', filterMenu);

function filterMenu() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const category = document.getElementById('categoryFilter').value;
    
    let filtered = allMenuItems;
    
    if (searchTerm) {
        filtered = filtered.filter(item => 
            item.name.toLowerCase().includes(searchTerm) || 
            (item.description && item.description.toLowerCase().includes(searchTerm))
        );
    }
    
    // Simple category filtering based on name
    if (category !== 'all') {
        filtered = filtered.filter(item => 
            item.name.toLowerCase().includes(category) ||
            (item.description && item.description.toLowerCase().includes(category))
        );
    }
    
    displayMenu(filtered);
}

// Load menu on page load
loadMenu();