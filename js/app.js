// App Logic
document.addEventListener('DOMContentLoaded', () => {
    renderPizzas();
    updateFooter();
    setupOrderButton();
});

// Render all pizzas
function renderPizzas() {
    const pizzaList = document.getElementById('pizzaList');
    
    if (pizzaData.length === 0) {
        pizzaList.innerHTML = '<p class="menu-intro">We\'re still working on our menu. Please come back later :)</p>';
        return;
    }
    
    pizzaList.innerHTML = '';
    
    pizzaData.forEach(pizza => {
        const pizzaItem = createPizzaElement(pizza);
        pizzaList.appendChild(pizzaItem);
    });
}

// Create pizza element
function createPizzaElement(pizza) {
    const li = document.createElement('li');
    li.className = `pizza ${pizza.soldOut ? 'sold-out' : ''}`;
    
    li.innerHTML = `
        <img src="${pizza.photoName}" alt="${pizza.name}">
        <div class="pizza-details">
            <h3>${pizza.name}</h3>
            <p class="pizza-ingredients">${pizza.ingredients}</p>
            <span class="pizza-price">${pizza.soldOut ? 'SOLD OUT' : `$${pizza.price}`}</span>
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
    const orderButton = document.querySelector('.btn');
    
    if (orderButton) {
        orderButton.addEventListener('click', () => {
            const currentHour = new Date().getHours();
            const openHour = 12;
            const closeHour = 22;
            const isOpen = currentHour >= openHour && currentHour < closeHour;
            
            if (isOpen) {
                alert('🍕 Great choice! Your order is being prepared. Please wait for our staff to contact you.');
                console.log('Order placed at:', new Date().toLocaleString());
            } else {
                alert(`Sorry, we're currently closed. We open at ${openHour}:00.`);
            }
        });
    }
}

// Optional: Add filtering functionality
function filterPizzas(searchTerm) {
    const filteredPizzas = pizzaData.filter(pizza => 
        pizza.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pizza.ingredients.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    const pizzaList = document.getElementById('pizzaList');
    pizzaList.innerHTML = '';
    
    filteredPizzas.forEach(pizza => {
        const pizzaItem = createPizzaElement(pizza);
        pizzaList.appendChild(pizzaItem);
    });
}

// Optional: Log pizza data for debugging
console.log('🍕 Pizza Menu Loaded!');
console.log('Total pizzas:', pizzaData.length);
console.log('Available pizzas:', pizzaData.filter(p => !p.soldOut).length);
