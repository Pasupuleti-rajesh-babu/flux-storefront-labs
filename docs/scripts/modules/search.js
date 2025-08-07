export function initSearch() {
    const searchOverlayToggle = document.getElementById('search-overlay-toggle');
    const searchOverlay = document.getElementById('search-overlay');
    const searchOverlayClose = document.getElementById('search-overlay-close');
    const searchInput = document.getElementById('search-overlay-input');
    const searchResultsContainer = document.getElementById('search-overlay-results');
    const viewAllLink = document.getElementById('view-all-results-link');
    const relativePath = document.body.dataset.relativePath || './';
    let allProducts = [];

    async function fetchAllProducts() {
        if (allProducts.length > 0) return;
        try {
            const response = await fetch(`${relativePath}search-data.json`);
            allProducts = await response.json();
        } catch (error) {
            console.error('Error fetching search data:', error);
        }
    }

    searchOverlayToggle.addEventListener('click', () => {
        searchOverlay.classList.remove('hidden');
        fetchAllProducts();
        searchInput.focus();
    });

    searchOverlayClose.addEventListener('click', () => {
        searchOverlay.classList.add('hidden');
    });

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        if (query.length < 2) {
            searchResultsContainer.innerHTML = '';
            viewAllLink.classList.add('hidden');
            return;
        }

        const filteredProducts = allProducts.filter(product => 
            product.title.toLowerCase().includes(query) || 
            product.tags.some(tag => tag.toLowerCase().includes(query))
        );

        const resultsHtml = filteredProducts.slice(0, 6).map(product => `
            <a href="${relativePath}${product.url}" class="group block">
                <div class="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden">
                    <img src="${product.image}" alt="${product.title}" class="w-full h-full object-center object-cover group-hover:opacity-75" loading="lazy">
                </div>
                <h3 class="mt-4 text-sm text-gray-700">${product.title}</h3>
                <p class="mt-1 text-lg font-medium text-gray-900">${product.price}</p>
            </a>
        `).join('');

        searchResultsContainer.innerHTML = resultsHtml;
        
        viewAllLink.href = `${relativePath}collections/all?q=${encodeURIComponent(query)}`;
        viewAllLink.textContent = `View all results for "${query}" →`;
        viewAllLink.classList.remove('hidden');
    });
} 