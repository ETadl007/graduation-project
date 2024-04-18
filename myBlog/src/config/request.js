import axios from "axios";
import { h } from "vue";
import { ElNotification } from "element-plus";
import router from "../router/index";

// 创建一个 axios 实例
const http = axios.create({
    timeout: 10000, // 请求超时时间毫秒
    withCredentials: true, // 异步请求携带cookie
    headers: {
        // 设置后端需要的传参类型
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
    },
});

// 添加请求拦截器
http.interceptors.request.use(
    function (config) {
        // 在发送请求之前做些什么
        return config;
    },
    function (error) {
        // 对请求错误做些什么
        console.log(error);
        return Promise.reject(error);
    }
);

// 添加响应拦截器
http.interceptors.response.use(
    function (response) {
        // 对响应数据做点什么
        // dataAxios 是 axios 返回数据中的 data
        const dataAxios = response.data;
        const { code, message } = dataAxios;
        switch (code + "") {
            case "100":
                // 表示给用户一些提示
                ElNotification({
                    offset: 60,
                    title: "温馨提示",
                    message: h("div", { style: "color: #e6c081; font-weight: 600;" }, message),
                });
                break;
        }

        return dataAxios;
    },
);

http.defaults.baseURL = "http://localhost:8888"

export default http;
