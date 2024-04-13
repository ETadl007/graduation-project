import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from "path";
import AutoImport from "unplugin-auto-import/vite"; // 自动导入组件
import Components from "unplugin-vue-components/vite"; // 自动导入src/components下的组件
import { ElementPlusResolver } from "unplugin-vue-components/resolvers"; // 按需导入ep
import { createSvgIconsPlugin } from "vite-plugin-svg-icons"; // 支持svg

export default defineConfig({
  base: "./",
  publicPath: ".",
  root: process.cwd(), // 绝对路径
  resolve: {
    // 配置路径别名
    alias: [
      // 配置 @ 指代 src
      {
        find: "@",
        replacement: resolve(__dirname, "./src"),
      },
    ],
    extensions: [".js", ".vue", ".json"],
  },
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      dts: true,
      dirs: "src/components",
      resolvers: [ElementPlusResolver()], // ElementPlus按需加载
    }),
    // svg
    createSvgIconsPlugin({
      // Specify the icon folder to be cached
      iconDirs: [resolve(process.cwd(), "src/icons/svg")],
    }),
  ],
  build: {
    sourcemap: false,
    // 消除打包大小超过500kb警告
    chunkSizeWarningLimit: 4000,
    rollupOptions: {
      input: {
        index: resolve("index.html"),
      },
      // 静态资源分类打包
      output: {
        chunkFileNames: "static/js/[name]-[hash].js",
        entryFileNames: "static/js/[name]-[hash].js",
        assetFileNames: "static/[ext]/[name]-[hash].[ext]",
      },
    },
  },
})
