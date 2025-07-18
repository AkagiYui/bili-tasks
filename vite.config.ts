import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import monkey, { cdn } from 'vite-plugin-monkey';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    preact(),
    monkey({
      entry: 'src/main.tsx',
      userscript: {
        name: '【哔哩哔哩】一些任务',
        icon: 'https://static.hdslb.com/images/favicon.ico',
        namespace: 'https://github.com/AkagiYui/UserScript',
        match: ['https://space.bilibili.com/*/favlist*'],
        supportURL: 'https://github.com/AkagiYui/UserScript/issues',
        homepage: 'https://github.com/AkagiYui',
        author: 'AkagiYui',
        license: 'MIT',
        
      },
      
      build: {
        externalGlobals: {
          preact: cdn.jsdelivr('preact', 'dist/preact.min.js'),
        },
      },
    }),
  ],
});
