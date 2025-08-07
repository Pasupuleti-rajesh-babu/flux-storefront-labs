# Flux Storefront Labs

## High-Performance, Adaptable eCommerce Theme

Flux Storefront Labs is a performance-first frontend theme system designed for modern eCommerce. Its primary goal is to deliver exceptional speed and a seamless user experience by adhering to strict performance budgets and Core Web Vitals targets.

The architecture is built around a small, efficient **core** and a plug-in **adapter** system. This allows the theme to be easily adapted to different eCommerce platforms or backend data sources without modifying the core presentation and logic.

### Key Features

- **Performance-First:** Optimized for sub-2.5s Largest Contentful Paint (LCP) and a Cumulative Layout Shift (CLS) under 0.1.
- **Vanilla JS & Tailwind CSS:** A lightweight stack ensures minimal overhead and fast execution.
- **Static Site Generation (SSG):** All pages are pre-built for instant loading.
- **Adapter-Based Architecture:** Decouples the UI from the data source, enabling high flexibility.
- **Comprehensive UX:** Includes essential eCommerce features like a cart drawer, predictive search, and client-side filtering.
- **Quality Gates:** Enforced through Lighthouse CI, ESLint, and Prettier to maintain high standards.

---

## The Adapter Pattern

The power of Flux lies in its adapter system. An "adapter" is a directory located in `/adapters` that provides platform-specific data to the core theme. The core theme consumes this data to render the final HTML.

### How It Works

1.  **Data Supply:** Each adapter must contain a `/data` directory with `products.json` and `collections.json` files. These files provide the product catalog and collection information in a standardized format that the core theme expects.
2.  **Build-Time Selection:** You can select which adapter to use by setting the `ADAPTER` environment variable during the build process. If no adapter is specified, it defaults to `generic`.

For example, the repository includes two adapters:
-   **/adapters/generic/**: Provides a sample set of data for a generic HTML storefront.
-   **/adapters/liquid/**: Structured to provide data from a Shopify-like environment.

This separation of concerns means you can create a new adapter for any platform (e.g., Magento, BigCommerce, or a custom CMS) simply by creating a new directory and providing the required JSON data files.

---

## Quick Start & Local Development

### Prerequisites

- [Node.js](https://nodejs.org/en/) version 18 or higher.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Pasupuleti-rajesh-babu/flux-storefront-labs.git
    cd flux-storefront-labs
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```

### Build

To build the site, run the following command. This will generate the static files in the `/docs` directory, ready for deployment.

```bash
# Build using the default 'generic' adapter
npm run build

# Build using a specific adapter (e.g., 'liquid')
ADAPTER=liquid npm run build
```

### Local Development Server

For a better development experience with live reloading, you can use a simple tool like `live-server`.

1.  **Install `live-server` globally:**
    ```bash
    npm install -g live-server
    ```
2.  **Run the build command first, then start the server:**
    ```bash
    npm run build
    live-server docs
    ```
This will open the site in your browser, and any changes you make will be automatically reloaded after you run the build command again. 