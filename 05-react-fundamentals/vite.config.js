import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Respect PORT when a tool assigns one (defaults to Vite's 5173)
    port: Number(process.env.PORT) || 5173,
  },
})
