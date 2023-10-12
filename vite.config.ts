import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // ESM import fix- https://github.com/vitejs/vite/issues/2679
  optimizeDeps: {
    include: ['@openble/openble-sdk'],
  },
  build: {
    commonjsOptions: {
      exclude: ['@openble/openble-sdk/*'],
      include: ['**/*']
    }
  }
  // resolve: {
  //   alias: {
  //     '@openble/openble-sdk': path.resolve(__dirname, 'node_modules/@openble/openble-sdk'),
  //   },
  // },
})
