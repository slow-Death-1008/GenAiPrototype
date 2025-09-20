import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // IMPORTANT: Change 'your-repo-name' to your repository's name
  base: '/GenAiPrototype', 
  plugins: [react(), tailwindcss()]
})