import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url';   // <-- REQUIRED


export default defineConfig({
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./resources/js", import.meta.url)),
        }
    },
    plugins: [
        laravel({
            input: ['resources/js/app.js','resources/css/app.css'],
            refresh: true,
        }),
        tailwindcss(),
        vue({
            template: {
                transformAssetUrls: {
                    base: null,
                    includeAbsolute: false,
                },
            },
        }),
    ],
});
