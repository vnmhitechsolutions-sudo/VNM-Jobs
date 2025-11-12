// vite.config.js

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // --- ADD THIS RESOLVE BLOCK ---
  resolve: {
    alias: {
      // Creates an alias pointing 'react-icons' to the real path.
      // This forces Vite to re-resolve the path every time.
      'react-icons': 'react-icons' 
    }
  },
  // ------------------------------
  
  optimizeDeps: {
    // Keep this exclusion active!
    exclude: ['react-icons'] 
  }
});