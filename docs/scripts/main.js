import { initSearch } from './modules/search.js';
import { initMobileMenu } from './modules/navigation.js';
import { initFiltering } from './modules/filtering.js';
import { initStickyATC } from './modules/sticky-atc.js';
import { initCartDrawer } from './modules/cart-drawer.js';
import { initAnalytics } from './modules/analytics.js';
import { initPDP } from './modules/pdp.js';

document.addEventListener('DOMContentLoaded', () => {
    initSearch();
    initMobileMenu();
    initCartDrawer();
    initAnalytics();

    if (document.querySelector('.form-checkbox')) {
        initFiltering();
    }
    if (document.querySelector('.sticky.bottom-0')) {
        initStickyATC();
    }
    const productDataEl = document.getElementById('product-data');
    if (productDataEl) {
        const product = JSON.parse(productDataEl.textContent);
        initPDP(product);
        initPdpAnalytics(product);
    }
}); 