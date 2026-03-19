import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss()],
	resolve: {
		alias: {
			"@": resolve(__dirname, "src"),
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
