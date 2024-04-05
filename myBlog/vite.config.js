import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from "path";
import AutoImport from "unplugin-auto-import/vite"; // 自动导入组件
import Components from "unplugin-vue-components/vite"; // 自动导入src/components下的组件
import { ElementPlusResolver } from "unplugin-vue-components/resolvers"; // 按需导入ep


export default defineConfig({
  base: "./",
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
    }),],
})
