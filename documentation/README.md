# Flux Storefront Labs

A performance-first storefront theme system with a small core and plug-in “adapters”.

## Quick Start

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/flux-storefront-labs.git
    cd flux-storefront-labs
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Build the project:**
    ```bash
    npm run build
    ```
4.  **Open `dist/index.html` in your browser.**

## Local Development

To run a development server with live reloading, you can use a simple tool like `live-server`.

1.  **Install `live-server`:**
    ```bash
    npm install -g live-server
    ```
2.  **Start the server:**
    ```bash
    live-server dist
    ```

## How to Add a New Adapter

1.  Create a new directory in the `adapters` directory (e.g., `adapters/my-adapter`).
2.  Create a `data` directory inside your new adapter directory.
3.  Add `products.json` and `collections.json` files to the `data` directory.
4.  To build with your new adapter, set the `ADAPTER` environment variable:
    ```bash
    ADAPTER=my-adapter npm run build
    ```

## How to Configure Design Tokens

Design tokens (colors, spacing, typography) are configured in `tailwind.config.js`. You can extend the `theme` object to add your own tokens.

## How to Verify Core Web Vitals

You can use Lighthouse in Chrome DevTools to verify the Core Web Vitals of the generated pages. You can also run the Lighthouse CI script:

```bash
npm run lhci:autorun
```

## Troubleshooting FAQ

**Q: The build is failing with a PostCSS error.**

A: This is likely due to a version mismatch between PostCSS and its plugins. Try deleting your `node_modules` directory and `package-lock.json` file, and then run `npm install` again. 