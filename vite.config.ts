import react from "@vitejs/plugin-react";
import autoprefixer from "autoprefixer";
import { resolve } from "node:path";
import tailwindcss from "tailwindcss";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			"@": resolve(__dirname, "src"),
		},
	},
	css: {
		postcss: {
			plugins: [tailwindcss, autoprefixer],
		},
	},
	server: {
		port: 3000,
		open: true,
		proxy: {
			"/randomuser-api": {
				target: "https://randomuser.me",
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/randomuser-api/, ""),
				// secure: false,
			},
		},
	},
});
