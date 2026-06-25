import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // هذا السطر يخبر Vite أن يضع المسارات بالنسبة للمجلد الحالي
  base: './', 
  build: {
    // التأكد من أن المخرجات تذهب لمجلد dist
    outDir: 'dist',
  }
})
