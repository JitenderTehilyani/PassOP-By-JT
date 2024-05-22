import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/PassOP-By-JT/",
  // base: "/PassOP-By-JT",
  plugins: [react()],
})
