import App from "./App.vue";
import { createApp } from "vue";
import router from "./router/index";
import { createPinia } from "pinia"; //引入pinia
import "element-plus/dist/index.css"; // 引入样式
import "element-plus/theme-chalk/dark/css-vars.css";

// tailwind.css  https://www.tailwindcss.cn/docs
import "./index.css";
import "./style.css";
// svg
import "virtual:svg-icons-register";

import image from "./directives/imageLoading";


const app = createApp(App);
app.directive("image", image);

app.use(router).use(createPinia()).mount("#app");
