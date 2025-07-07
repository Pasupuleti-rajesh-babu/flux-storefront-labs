import { addToCart } from './cart.js';

export function initPDP(product) {
    const addToCartButton = document.querySelector('.sticky.bottom-0 button');

    if (addToCartButton) {
        addToCartButton.addEventListener('click', () => {
            addToCart(product);
            document.getElementById('cart-button').click(); // Open the cart drawer
        });
    }
} 