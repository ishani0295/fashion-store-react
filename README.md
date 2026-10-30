# Northline — Fashion E-commerce Concept

A responsive fashion storefront built with React, Vite, CSS, and Lucide icons. It is a frontend portfolio project with working local interactions and demo product data.

## Features
- Responsive fashion storefront with mobile navigation
- Product catalog with category filters and text search
- Sorting by featured order and price
- Wishlist toggle for individual products
- Functional shopping bag: add items, update quantities, remove items, subtotal
- Newsletter form validation and feedback
- Demo checkout notice
- Accessible button labels, empty states, lazy-loaded product images
- Currency formatting in INR

## Requirements
- Node.js 18+ recommended
- npm

## Run locally
```bash
npm install
npm run dev
```
Open the local URL printed by Vite.

## Production build
```bash
npm run build
npm run preview
```
The production files are generated in `dist/`.

## Deploy to GitHub Pages
The easiest route for this Vite project is to deploy with GitHub Actions or a static host.

### Option A: Netlify or Vercel
1. Push the project folder to a GitHub repository.
2. Import the repository into Netlify or Vercel.
3. Set build command to `npm run build`.
4. Set publish/output directory to `dist`.
5. Deploy.

### Option B: GitHub Pages
1. Install the `gh-pages` package: `npm install --save-dev gh-pages`.
2. Add `"homepage": "https://YOUR-USERNAME.github.io/YOUR-REPO"` and scripts:
   - `"predeploy": "npm run build"`
   - `"deploy": "gh-pages -d dist"`
3. In `vite.config.js`, set `base: "/YOUR-REPO/"` (create the file if needed).
4. Run `npm run deploy`, then enable Pages for the `gh-pages` branch in repository settings.

## Notes
- Products, prices, cart, wishlist and newsletter are demo-only state in the browser; there is no backend, database, account system, or real payment processing.
- Images load from Unsplash and fonts from Google Fonts, so internet access is required for those assets.
- Replace placeholder contact details and sample content before presenting it as a real business.
- Describe this as a self-initiated concept project, not a commissioned client store.
