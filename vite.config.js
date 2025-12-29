import nunjucks from 'vite-plugin-nunjucks';

export default {
    root: '.',
    build: {
        outDir: 'dist',
        emptyOutDir: true,
        rollupOptions: {
            input: {
                main: 'index.njk',
            }
        }
    },
    plugins: [
        nunjucks()
    ]
}
