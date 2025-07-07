const CART_STORAGE_KEY = 'flux_cart';

export function getCart() {
    try {
        const cartJson = localStorage.getItem(CART_STORAGE_KEY);
        return cartJson ? JSON.parse(cartJson) : [];
    } catch (e) {
        console.error('Failed to get cart from localStorage', e);
        return [];
    }
}

export function saveCart(cart) {
    try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
        console.error('Failed to save cart to localStorage', e);
    }
}

export function addToCart(product) {
    const cart = getCart();
    const existingProductIndex = cart.findIndex(item => item.id === product.id);

    if (existingProductIndex > -1) {
        cart[existingProductIndex].quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    saveCart(cart);
    window.dispatchEvent(new CustomEvent('cart-updated'));
}

export function updateCartItemQuantity(productId, newQuantity) {
    let cart = getCart();
    const productIndex = cart.findIndex(item => item.id === productId);

    if (productIndex > -1) {
        if (newQuantity > 0) {
            cart[productIndex].quantity = newQuantity;
        } else {
            cart = cart.filter(item => item.id !== productId);
        }
        saveCart(cart);
        window.dispatchEvent(new CustomEvent('cart-updated'));
    }
} 