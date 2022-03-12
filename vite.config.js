import {
  defineConfig
} from 'vite'
import vue from '@vitejs/plugin-vue'
import styleImport from 'vite-plugin-style-import';
// https://vitejs.dev/config/

import Components from 'unplugin-vue-components/vite'
import {
  ElementPlusResolver
} from 'unplugin-vue-components/resolvers'

export default defineConfig({
  plugins: [vue(),
    styleImport({
      libs: [{
        libraryName: 'vant',
        esModule: true,
        resolveStyle: (name) => `vant/es/${name}/style`,
      }],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  server: {
    host: '0.0.0.0'
  },
  publicPath: process.env.NODE_ENV === "production" ? "/resume-vue" : "/"
})