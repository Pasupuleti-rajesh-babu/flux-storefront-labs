import { getCart, updateCartItemQuantity } from './cart.js';

export function initCartDrawer() {
    const cartToggle = document.getElementById('cart-button');
    const cartDrawer = document.getElementById('cart-drawer');
    const cartDrawerClose = document.getElementById('cart-drawer-close');
    const cartDrawerOverlay = document.getElementById('cart-drawer-overlay');
    const cartItemsContainer = document.getElementById('cart-items-container');
    const subtotalEl = document.querySelector('#cart-drawer .font-bold span:last-child');

    if (cartToggle && cartDrawer && cartDrawerClose && cartDrawerOverlay) {
        cartToggle.addEventListener('click', openDrawer);
        cartDrawerClose.addEventListener('click', closeDrawer);
        cartDrawerOverlay.addEventListener('click', closeDrawer);
        window.addEventListener('cart-updated', renderCart);
    }

    function openDrawer() {
        renderCart();
        cartDrawer.classList.remove('translate-x-full');
        cartDrawerOverlay.classList.remove('hidden');
    }

    function closeDrawer() {
        cartDrawer.classList.add('translate-x-full');
        cartDrawerOverlay.classList.add('hidden');
    }

    function renderCart() {
        const cart = getCart();
        cartItemsContainer.innerHTML = '';
        let subtotal = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="text-center text-gray-500">Your cart is empty.</p>';
        } else {
            cart.forEach(item => {
                const itemEl = document.createElement('div');
                itemEl.className = 'flex items-center justify-between mb-4';
                itemEl.innerHTML = `
                    <div class="flex items-center">
                        <img src="${item.image}" alt="${item.title}" class="w-16 h-16 object-cover mr-4">
                        <div>
                            <p class="font-semibold">${item.title}</p>
                            <p class="text-gray-500">${item.price}</p>
                        </div>
                    </div>
                    <div class="flex items-center">
                        <input type="number" value="${item.quantity}" min="1" class="w-16 text-center border" data-id="${item.id}">
                        <button class="ml-2 text-red-500" data-id="${item.id}">Remove</button>
                    </div>
                `;
                cartItemsContainer.appendChild(itemEl);

                const price = parseFloat(item.price.replace('$', ''));
                subtotal += price * item.quantity;
            });
        }

        subtotalEl.textContent = `$${subtotal.toFixed(2)}`;

        // Add event listeners for quantity changes and remove buttons
        cartItemsContainer.querySelectorAll('input[type="number"]').forEach(input => {
            input.addEventListener('change', (e) => {
                updateCartItemQuantity(parseInt(e.target.dataset.id), parseInt(e.target.value));
            });
        });

        cartItemsContainer.querySelectorAll('button.text-red-500').forEach(button => {
            button.addEventListener('click', (e) => {
                updateCartItemQuantity(parseInt(e.target.dataset.id), 0);
            });
        });
    }

    renderCart(); // Initial render
} 