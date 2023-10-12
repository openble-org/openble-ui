import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // optimizeDeps: {
  //   include: ['@openble/openble-sdk'],
  // },
  // resolve: {
  //   alias: {
  //     '@openble/openble-sdk': path.resolve(__dirname, 'node_modules/@openble/openble-sdk'),
  //   },
  // },
})
