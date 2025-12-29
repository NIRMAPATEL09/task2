# Sitara Institute - Task 2 (Vite + Nunjucks)

This project is the strict tech stack implementation of the Sitara Institute website.

## Tech Stack
- **Templating Engine:** [Nunjucks](https://mozilla.github.io/nunjucks/)
- **Bundler:** [Vite](https://vitejs.dev/)

## Project Structure
`src/templates`: Contains all Nunjucks templates (.njk)
`src/assets`: Contains static assets (CSS, JS, Images)
`dist`: Contains the final compiled HTML/CSS/JS

## How to Install
Ensure you have Node.js installed.
```bash
npm install
```

## How to Run Locally
Start the development server:
```bash
npm run dev
```

## How to Build
Generate the production static files in `dist/`:
```bash
npm run build
```

## Build Process
The `vite.config.js` is configured to use `vite-plugin-nunjucks` to compile all `.njk` files in `src/templates` into standard HTML files in the `dist` directory during the build process.
