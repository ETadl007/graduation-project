import http from "@/config/request";

/** 首页获取文章列表 */
export const homeGetArticleList = (current, size) => {
  return new Promise((resolve, reject) => {
    http.get(`/api/article/blogHomeGetArticleList/${current}/${size}`, {}).then((res) => {
      resolve(res);
    });
  });
};