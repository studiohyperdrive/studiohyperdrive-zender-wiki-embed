import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		lib: {
			entry: 'src/my-element/my-element.ts',
			formats: ['es'],
			fileName: 'zender-wiki-embed',
		},

		rollupOptions: {
			// external: /^lit/,
		},
	},
	esbuild: {
		logOverride: { 'this-is-undefined-in-esm': 'silent' },
	},
});
