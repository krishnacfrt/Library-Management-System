import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

   server: {
        proxy: {
            '/user': 'http://127.0.0.1:8000',
            '/books':'http://127.0.0.1:8000',
            "/admin": 'http://127.0.0.1:8000',
        }
    }

})
