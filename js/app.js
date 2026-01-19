// App Logic
let cart = [];
let currentFilter = {
    search: '',
    sort: '',
    category: 'all'
};

document.addEventListener('DOMContentLoaded', () => {
    renderPizzas();
    updateFooter();
    setupOrderButton();
    setupSearchAndFilters();
    setupCartModal();
    loadCartFromStorage();
});

// Render all pizzas
function renderPizzas() {
    const pizzaList = document.getElementById('pizzaList');
    
    if (pizzaData.length === 0) {
        pizzaList.innerHTML = '<p class="menu-intro">We\'re still working on our menu. Please come back later :)</p>';
        return;
    }
    
    // Apply filters
    let filteredPizzas = [...pizzaData];
    
    // Search filter
    if (currentFilter.search) {
        filteredPizzas = filteredPizzas.filter(pizza => 
            pizza.name.toLowerCase().includes(currentFilter.search.toLowerCase()) ||
            pizza.ingredients.toLowerCase().includes(currentFilter.search.toLowerCase())
        );
    }
    
    // Category filter
    if (currentFilter.category !== 'all') {
        if (currentFilter.category === 'available') {
            filteredPizzas = filteredPizzas.filter(pizza => !pizza.soldOut);
        } else {
            filteredPizzas = filteredPizzas.filter(pizza => pizza.category === currentFilter.category);
        }
    }
    
    // Sort
    if (currentFilter.sort) {
        switch(currentFilter.sort) {
            case 'price-low':
                filteredPizzas.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filteredPizzas.sort((a, b) => b.price - a.price);
                break;
            case 'name':
                filteredPizzas.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'rating':
                filteredPizzas.sort((a, b) => b.rating - a.rating);
                break;
        }
    }
    
    pizzaList.innerHTML = '';
    
    if (filteredPizzas.length === 0) {
        pizzaList.innerHTML = '<p class="menu-intro">No pizzas found matching your criteria.</p>';
        return;
    }
    
    filteredPizzas.forEach(pizza => {
        const pizzaItem = createPizzaElement(pizza);
        pizzaList.appendChild(pizzaItem);
    });
}

// Create pizza element
function createPizzaElement(pizza) {
    const li = document.createElement('li');
    li.className = `pizza ${pizza.soldOut ? 'sold-out' : ''}`;
    
    const stars = '⭐'.repeat(Math.floor(pizza.rating));
    
    li.innerHTML = `
        <img src="${pizza.photoName}" alt="${pizza.name}">
        <div class="pizza-details">
            <h3>${pizza.name}</h3>
            <div class="pizza-rating">${stars} ${pizza.rating}</div>
            <p class="pizza-ingredients">${pizza.ingredients}</p>
            <div class="pizza-footer">
                <span class="pizza-price">${pizza.soldOut ? 'SOLD OUT' : `$${pizza.price}`}</span>
                ${!pizza.soldOut ? `<button class="btn-add" onclick="addToCart('${pizza.name}')">Add to Cart</button>` : ''}
            </div>
        </div>
    `;
    
    return li;
}

// Update footer based on opening hours
function updateFooter() {
    const currentHour = new Date().getHours();
    const openHour = 12;
    const closeHour = 22;
    const isOpen = currentHour >= openHour && currentHour < closeHour;
    
    const footer = document.querySelector('.footer');
    const footerText = document.querySelector('.footer-text');
    
    if (isOpen) {
        footer.classList.remove('closed');
        footerText.textContent = `We're open from ${openHour}:00 to ${closeHour}:00. Come visit us or order online.`;
    } else {
        footer.classList.add('closed');
        footerText.textContent = `We're currently closed. We open at ${openHour}:00. Come back later!`;
    }
}

// Setup order button
function setupOrderButton() {
    const orderButton = document.querySelector('#orderBtn');
    const cartSummary = document.getElementById('cartSummary');
    
    if (orderButton) {
        orderButton.addEventListener('click', () => {
            if (cart.length > 0) {
                openCartModal();
            } else {
                const currentHour = new Date().getHours();
                const openHour = 12;
                const closeHour = 22;
                const isOpen = currentHour >= openHour && currentHour < closeHour;
                
                if (isOpen) {
                    alert('🍕 Please add items to your cart first!');
                } else {
                    alert(`Sorry, we're currently closed. We open at ${openHour}:00.`);
                }
            }
        });
    }
    
    // Cart summary click
    if (cartSummary) {
        cartSummary.addEventListener('click', () => {
            if (cart.length > 0) {
                openCartModal();
            }
        });
        cartSummary.style.cursor = 'pointer';
    }
}

// Setup search and filters
function setupSearchAndFilters() {
    const searchInput = document.getElementById('searchInput');
    const sortSelect = document.getElementById('sortSelect');
    const categoryFilter = document.getElementById('categoryFilter');
    
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            currentFilter.search = e.target.value;
            renderPizzas();
        });
    }
    
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            currentFilter.sort = e.target.value;
            renderPizzas();
        });
    }
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', (e) => {
            currentFilter.category = e.target.value;
            renderPizzas();
        });
    }
}

// Shopping Cart Functions
function addToCart(pizzaName) {
    const pizza = pizzaData.find(p => p.name === pizzaName);
    if (!pizza || pizza.soldOut) return;
    
    const existingItem = cart.find(item => item.name === pizzaName);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            name: pizza.name,
            price: pizza.price,
            quantity: 1
        });
    }
    
    updateCartDisplay();
    saveCartToStorage();
    showNotification(`${pizzaName} added to cart! 🎉`);
}

function removeFromCart(pizzaName) {
    const itemIndex = cart.findIndex(item => item.name === pizzaName);
    if (itemIndex > -1) {
        if (cart[itemIndex].quantity > 1) {
            cart[itemIndex].quantity--;
        } else {
            cart.splice(itemIndex, 1);
        }
    }
    updateCartDisplay();
    updateCartModal();
    saveCartToStorage();
}

function updateCartDisplay() {
    const cartCount = document.querySelector('.cart-count');
    const cartTotal = document.querySelector('.cart-total');
    const cartSummary = document.getElementById('cartSummary');
    
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    if (cartCount) cartCount.textContent = totalItems;
    if (cartTotal) cartTotal.textContent = `$${totalPrice.toFixed(2)}`;
    
    if (cartSummary) {
        cartSummary.style.display = totalItems > 0 ? 'block' : 'none';
    }
}

function setupCartModal() {
    const modal = document.getElementById('cartModal');
    const closeBtn = document.getElementById('closeModal');
    const checkoutBtn = document.getElementById('checkoutBtn');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeCartModal);
    }
    
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeCartModal();
            }
        });
    }
    
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', handleCheckout);
    }
}

function openCartModal() {
    const modal = document.getElementById('cartModal');
    if (modal) {
        modal.style.display = 'flex';
        updateCartModal();
    }
}

function closeCartModal() {
    const modal = document.getElementById('cartModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function updateCartModal() {
    const cartItems = document.getElementById('cartItems');
    const modalTotal = document.getElementById('modalTotal');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        if (modalTotal) modalTotal.textContent = '$0.00';
        return;
    }
    
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-info">
                <strong>${item.name}</strong>
                <span class="cart-item-price">$${item.price} × ${item.quantity}</span>
            </div>
            <div class="cart-item-controls">
                <button class="btn-quantity" onclick="removeFromCart('${item.name}')">−</button>
                <span class="item-quantity">${item.quantity}</span>
                <button class="btn-quantity" onclick="addToCart('${item.name}')">+</button>
            </div>
        </div>
    `).join('');
    
    if (modalTotal) modalTotal.textContent = `$${totalPrice.toFixed(2)}`;
}

function handleCheckout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const itemsList = cart.map(item => `${item.quantity}x ${item.name}`).join(', ');
    
    alert(`🎉 Order Confirmed!\n\nItems: ${itemsList}\nTotal: $${totalPrice.toFixed(2)}\n\nThank you for your order!`);
    
    // Clear cart
    cart = [];
    updateCartDisplay();
    closeCartModal();
    saveCartToStorage();
}

function saveCartToStorage() {
    localStorage.setItem('pizzaCart', JSON.stringify(cart));
}

function loadCartFromStorage() {
    const savedCart = localStorage.getItem('pizzaCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartDisplay();
    }
}

function showNotification(message) {
    // Simple notification - you can enhance this
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 2000);
}

// Optional: Log pizza data for debugging
console.log('🍕 Pizza Menu Loaded!');
console.log('Total pizzas:', pizzaData.length);
console.log('Cart initialized');

console.log('Available pizzas:', pizzaData.filter(p => !p.soldOut).length);
