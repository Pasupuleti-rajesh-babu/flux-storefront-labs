export function initFiltering() {
  const filterCheckboxes = document.querySelectorAll('.form-checkbox');

  filterCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', updateFilters);
  });

  function updateFilters() {
    const activeTags = Array.from(filterCheckboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.dataset.tag);

    const url = new URL(window.location);
    url.searchParams.set('tags', activeTags.join(','));
    window.history.pushState({}, '', url);

    const productGrid = document.querySelector('.grid.grid-cols-1.sm\\:grid-cols-2.md\\:grid-cols-3');
    if (!productGrid) return;
    const products = productGrid.querySelectorAll('.group');

    const filters = {
        category: activeTags.filter(t => t.startsWith('category-')).map(t => t.replace('category-', '')),
        color: activeTags.filter(t => t.startsWith('color-')).map(t => t.replace('color-', ''))
    };

    products.forEach(product => {
        const productTags = product.dataset.tags.split(',');
        const productCategory = productTags.find(t => t.startsWith('category-'))?.replace('category-', '');
        const productColor = productTags.find(t => t.startsWith('color-'))?.replace('color-', '');

        const categoryMatch = filters.category.length === 0 || filters.category.includes(productCategory);
        const colorMatch = filters.color.length === 0 || filters.color.includes(productColor);

        product.style.display = (categoryMatch && colorMatch) ? 'block' : 'none';
    });
}

  // Set initial state from URL
  const initialUrl = new URL(window.location);
  const initialTags = initialUrl.searchParams.get('tags');
  if (initialTags) {
    const tags = initialTags.split(',');
    filterCheckboxes.forEach(checkbox => {
      if (tags.includes(checkbox.dataset.tag)) {
        checkbox.checked = true;
      }
    });
    updateFilters(); // Run filters on page load
  }
} 