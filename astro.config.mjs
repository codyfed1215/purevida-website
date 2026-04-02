// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  site: 'https://purevidawater.com',
  trailingSlash: 'never',
  output: 'static',
  adapter: vercel(),
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [sitemap({
    filter: (page) => {
      const allowed = [
        'https://purevidawater.com/',
        'https://purevidawater.com/about',
        'https://purevidawater.com/contact',
        'https://purevidawater.com/products',
        'https://purevidawater.com/products/water-coolers',
        'https://purevidawater.com/products/ice-machines',
        'https://purevidawater.com/products/coffee-systems',
        'https://purevidawater.com/locations',
        'https://purevidawater.com/locations/dallas',
        'https://purevidawater.com/locations/austin',
        'https://purevidawater.com/locations/san-antonio',
        'https://purevidawater.com/blog',
      ];
      return allowed.includes(page) || page.startsWith('https://purevidawater.com/blog/');
    }
  })]
});