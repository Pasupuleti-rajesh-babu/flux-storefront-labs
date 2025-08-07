// A simple data layer helper
window.dataLayer = window.dataLayer || [];
function gtag() {
    dataLayer.push(arguments);
}

export function trackEvent(eventName, eventParams) {
    gtag('event', eventName, eventParams);
    console.log(`Analytics event: ${eventName}`, eventParams);
}

export function initAnalytics() {
    // Search query event
    const searchInput = document.querySelector('#search-input'); // This ID needs to be added to the search input
    if (searchInput) {
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                trackEvent('search_query', {
                    query_length: searchInput.value.length,
                });
            }
        });
    }

    // Add to cart event
    const addToCartButton = document.querySelector('.sticky.bottom-0 button');
    if (addToCartButton) {
        addToCartButton.addEventListener('click', () => {
            trackEvent('add_to_cart', {
                product_id: '123', // This should be dynamic
            });
        });
    }

    // Checkout start event
    const checkoutButton = document.querySelector('#cart-drawer .w-full.bg-gray-800');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', () => {
            trackEvent('checkout_start', {});
        });
    }
}

function initPdpAnalytics(product) {
    const addToCartButton = document.querySelector('.sticky.bottom-0 button');
    if (addToCartButton) {
        addToCartButton.addEventListener('click', () => {
            trackEvent('add_to_cart', {
                product_id: product.id.toString(),
            });
        });
    }
} 