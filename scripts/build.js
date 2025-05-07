const path = require('path');
const fs = require('fs');

const coreDir = path.join(__dirname, '..', 'core');
const docsDir = path.join(__dirname, '..', 'docs');

// Clean and create the output directory
if (fs.existsSync(docsDir)) {
    fs.rmSync(docsDir, { recursive: true, force: true });
}
fs.mkdirSync(docsDir, { recursive: true });

function renderTemplate(template, data) {
    let result = template;
    for (const key in data) {
        let value = data[key];
        if (Array.isArray(value)) {
            value = value.join(',');
        }
        if (typeof value === 'string' || typeof value === 'number') {
            const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
            result = result.replace(regex, value);
        }
    }
    return result;
}

const getRelativePath = (pagePath) => {
    const depth = (pagePath.match(/\//g) || []).length;
    return depth === 0 ? './' : '../'.repeat(depth);
};

const adapter = process.env.ADAPTER || 'generic';

// Load data from the selected adapter
const dataDir = path.join(__dirname, '..', 'adapters', adapter, 'data');

const headerHtml = fs.readFileSync(path.join(coreDir, 'partials', '_header.html'), 'utf-8');
const footerHtml = fs.readFileSync(path.join(coreDir, 'partials', '_footer.html'), 'utf-8');
const cartDrawerHtml = fs.readFileSync(path.join(coreDir, 'partials', '_cart-drawer.html'), 'utf-8');
const searchOverlayHtml = fs.readFileSync(path.join(coreDir, 'partials', '_search-overlay.html'), 'utf-8');


console.log(`--- Loading data from adapter: ${adapter} ---`);

const productsPath = path.join(dataDir, 'products.json');
console.log(`Reading products from: ${productsPath}`);
const productsFileContent = fs.readFileSync(productsPath, 'utf-8');
// console.log('Products file content:', productsFileContent); // Uncomment for deep debugging
const products = JSON.parse(productsFileContent);

const collectionsPath = path.join(dataDir, 'collections.json');
console.log(`Reading collections from: ${collectionsPath}`);
const collectionsFileContent = fs.readFileSync(collectionsPath, 'utf-8');
// console.log('Collections file content:', collectionsFileContent); // Uncomment for deep debugging
const collections = JSON.parse(collectionsFileContent);

// Generate search data
const searchData = products.map(product => ({
    id: product.id,
    title: product.title,
    price: product.price,
    image: product.image,
    tags: product.tags,
    url: `products/${product.id}/`
}));
fs.writeFileSync(path.join(docsDir, 'search-data.json'), JSON.stringify(searchData, null, 2));


// Base Templates
const mainTemplate = fs.readFileSync(path.join(coreDir, 'index.html'), 'utf-8');
const collectionTemplate = fs.readFileSync(path.join(coreDir, 'collection.html'), 'utf-8');
const pdpTemplate = fs.readFileSync(path.join(coreDir, 'pdp.html'), 'utf-8');

// Partials
const homepagePartial = fs.readFileSync(path.join(coreDir, 'partials', '_homepage.html'), 'utf-8');
const collectionPartial = fs.readFileSync(path.join(coreDir, 'partials', '_collection.html'), 'utf-8');
const pdpPartial = fs.readFileSync(path.join(coreDir, 'partials', '_pdp.html'), 'utf-8');

// --- Render Homepage ---
let featuredCollectionsHtml = '';
collections.slice(0, 3).forEach(collection => {
    featuredCollectionsHtml += renderTemplate(fs.readFileSync(path.join(coreDir, 'partials', '_collection-card.html'), 'utf-8'), collection);
});
let processedHomepageHtml = homepagePartial.replace('<!-- Featured collection items will go here -->', featuredCollectionsHtml);

let featuredProductsHtml = '';
products.slice(0, 4).forEach(product => {
    featuredProductsHtml += renderTemplate(fs.readFileSync(path.join(coreDir, 'partials', '_product-card.html'), 'utf-8'), product);
});
processedHomepageHtml = processedHomepageHtml.replace('<!-- Featured product items will go here -->', featuredProductsHtml);

let homepageResult = mainTemplate.replace('<!-- Main content will be injected here -->', processedHomepageHtml);
homepageResult = homepageResult.replace('<!-- Header content will go here -->', headerHtml);
homepageResult = homepageResult.replace('<!-- Footer content will go here -->', footerHtml);
homepageResult = homepageResult.replace('<!-- CART_DRAWER -->', cartDrawerHtml);
homepageResult = homepageResult.replace('<!-- SEARCH_OVERLAY -->', searchOverlayHtml);
homepageResult = homepageResult.replace(/{{RELATIVE_PATH}}/g, getRelativePath('index.html'));
fs.writeFileSync(path.join(docsDir, 'index.html'), homepageResult);


// --- Render Collection Pages ---
collections.forEach(collection => {
    let productGridHtml = '';
    const collectionProducts = products.filter(p => p.tags.includes(`category-${collection.handle}`));
    collectionProducts.forEach(product => {
        productGridHtml += renderTemplate(fs.readFileSync(path.join(coreDir, 'partials', '_product-card.html'), 'utf-8'), product);
    });
    
    let processedCollectionHtml = collectionPartial.replace('<!-- Product grid will go here -->', productGridHtml);
    processedCollectionHtml = renderTemplate(processedCollectionHtml, { title: collection.title });
    
    let collectionResult = collectionTemplate.replace('<!-- Main content will be injected here -->', processedCollectionHtml);
    collectionResult = collectionResult.replace('<!-- Header content will go here -->', headerHtml);
    collectionResult = collectionResult.replace('<!-- Footer content will go here -->', footerHtml);
    collectionResult = collectionResult.replace('<!-- CART_DRAWER -->', cartDrawerHtml);
    collectionResult = collectionResult.replace('<!-- SEARCH_OVERLAY -->', searchOverlayHtml);
    collectionResult = collectionResult.replace(/{{RELATIVE_PATH}}/g, getRelativePath(`collections/${collection.handle}/index.html`));
    
    const collectionDir = path.join(docsDir, 'collections', collection.handle);
    fs.mkdirSync(collectionDir, { recursive: true });
    fs.writeFileSync(path.join(collectionDir, 'index.html'), collectionResult);
});

// --- Render "All" Collection Page ---
let allProductGridHtml = '';
products.forEach(product => {
    allProductGridHtml += renderTemplate(fs.readFileSync(path.join(coreDir, 'partials', '_product-card.html'), 'utf-8'), product);
});
let allCollectionHtml = collectionPartial.replace('<!-- Product grid will go here -->', allProductGridHtml);
allCollectionHtml = renderTemplate(allCollectionHtml, { title: 'All Products' });

let allCollectionResult = collectionTemplate.replace('<!-- Main content will be injected here -->', allCollectionHtml);
allCollectionResult = allCollectionResult.replace('<!-- Header content will go here -->', headerHtml);
allCollectionResult = allCollectionResult.replace('<!-- Footer content will go here -->', footerHtml);
allCollectionResult = allCollectionResult.replace('<!-- CART_DRAWER -->', cartDrawerHtml);
allCollectionResult = allCollectionResult.replace('<!-- SEARCH_OVERLAY -->', searchOverlayHtml);
allCollectionResult = allCollectionResult.replace(/{{RELATIVE_PATH}}/g, getRelativePath('collections/all/index.html'));

const allCollectionDir = path.join(docsDir, 'collections', 'all');
fs.mkdirSync(allCollectionDir, { recursive: true });
fs.writeFileSync(path.join(allCollectionDir, 'index.html'), allCollectionResult);


// --- Render Product Pages ---
products.forEach(product => {
    let processedPdpHtml = renderTemplate(pdpPartial, product);
    processedPdpHtml = processedPdpHtml.replace('{{product_json}}', JSON.stringify(product));
    
    let pdpResult = pdpTemplate.replace('<!-- Main content will be injected here -->', processedPdpHtml);
    pdpResult = pdpResult.replace('<!-- Header content will go here -->', headerHtml);
    pdpResult = pdpResult.replace('<!-- Footer content will go here -->', footerHtml);
    pdpResult = pdpResult.replace('<!-- CART_DRAWER -->', cartDrawerHtml);
    pdpResult = pdpResult.replace('<!-- SEARCH_OVERLAY -->', searchOverlayHtml);
    pdpResult = pdpResult.replace(/{{RELATIVE_PATH}}/g, getRelativePath(`products/${product.id}/index.html`));

    const productDir = path.join(docsDir, 'products', product.id.toString());
    fs.mkdirSync(productDir, { recursive: true });
    fs.writeFileSync(path.join(productDir, 'index.html'), pdpResult);
});

// --- Copy Scripts ---
const scriptsDir = path.join(coreDir, 'scripts');
const distScriptsDir = path.join(docsDir, 'scripts');
if (!fs.existsSync(distScriptsDir)) {
    fs.mkdirSync(distScriptsDir, { recursive: true });
}
fs.readdirSync(scriptsDir).forEach(file => {
    if (fs.lstatSync(path.join(scriptsDir, file)).isDirectory()) {
        fs.cpSync(path.join(scriptsDir, file), path.join(distScriptsDir, file), { recursive: true });
    } else {
        fs.copyFileSync(path.join(scriptsDir, file), path.join(distScriptsDir, file));
    }
});

console.log('Build complete!');