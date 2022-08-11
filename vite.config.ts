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
			external: [new RegExp('/src/my-element/config-mode.style.ts')],
		},
	},
	esbuild: {
		logOverride: { 'this-is-undefined-in-esm': 'silent' },
	},
});
