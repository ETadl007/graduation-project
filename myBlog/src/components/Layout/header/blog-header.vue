<template>
  <div class="header_box">
    <div class="pc_menu flex_r_between">
      <div class="sub-avatar">
        <router-link to="/"><el-avatar class="el-avatar" /> </router-link>
      </div>
      <div class="flex_r_around">
        <BlogSearch></BlogSearch>
        <el-menu
          class="sub-menu"
          mode="horizontal"
          :default-active="getPath"
          :ellipsis="false"
          @select="(val) => handleSelect(val, 'pc')"
        >
          <el-menu-item index="/home"
            ><i class="iconfont icon-home">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-house"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5ZM13 7.207l-5-5-5 5V13.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7.207Z"
                /></svg
            ></i>
            主页</el-menu-item
          >
          <el-menu-item index="/archives"
            ><i class="iconfont icon-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-calendar4-week"
                viewBox="0 0 16 16"
              >
                <path
                  d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v1h14V3a1 1 0 0 0-1-1H2zm13 3H1v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V5z"
                />
                <path
                  d="M11 7.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-2 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z"
                /></svg
            ></i>
            时间轴</el-menu-item
          >
          <el-sub-menu index="/resources">
            <template #title
              ><i class="iconfont icon-menu">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-microsoft"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M7.462 0H0v7.19h7.462V0zM16 0H8.538v7.19H16V0zM7.462 8.211H0V16h7.462V8.211zm8.538 0H8.538V16H16V8.211z"
                  /></svg
              ></i>
              资源导航
            </template>
            <el-menu-item index="/resources/front"
              ><i class="iconfont icon-folder">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-folder2"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M1 3.5A1.5 1.5 0 0 1 2.5 2h2.764c.958 0 1.76.56 2.311 1.184C7.985 3.648 8.48 4 9 4h4.5A1.5 1.5 0 0 1 15 5.5v7a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 1 12.5v-9zM2.5 3a.5.5 0 0 0-.5.5V6h12v-.5a.5.5 0 0 0-.5-.5H9c-.964 0-1.71-.629-2.174-1.154C6.374 3.334 5.82 3 5.264 3H2.5zM14 7H2v5.5a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 .5-.5V7z"
                  /></svg
              ></i>
              前端</el-menu-item
            >
            <el-menu-item index="/resources/back"
              ><i class="iconfont icon-houduankaifa">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-braces"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M2.114 8.063V7.9c1.005-.102 1.497-.615 1.497-1.6V4.503c0-1.094.39-1.538 1.354-1.538h.273V2h-.376C3.25 2 2.49 2.759 2.49 4.352v1.524c0 1.094-.376 1.456-1.49 1.456v1.299c1.114 0 1.49.362 1.49 1.456v1.524c0 1.593.759 2.352 2.372 2.352h.376v-.964h-.273c-.964 0-1.354-.444-1.354-1.538V9.663c0-.984-.492-1.497-1.497-1.6zM13.886 7.9v.163c-1.005.103-1.497.616-1.497 1.6v1.798c0 1.094-.39 1.538-1.354 1.538h-.273v.964h.376c1.613 0 2.372-.759 2.372-2.352v-1.524c0-1.094.376-1.456 1.49-1.456V7.332c-1.114 0-1.49-.362-1.49-1.456V4.352C13.51 2.759 12.75 2 11.138 2h-.376v.964h.273c.964 0 1.354.444 1.354 1.538V6.3c0 .984.492 1.497 1.497 1.6z"
                  /></svg
              ></i>
              后端</el-menu-item
            >
          </el-sub-menu>
          <el-menu-item index="/category"
            ><i class="iconfont icon-sort">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-border-width"
                viewBox="0 0 16 16"
              >
                <path
                  d="M0 3.5A.5.5 0 0 1 .5 3h15a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5H.5a.5.5 0 0 1-.5-.5v-2zm0 5A.5.5 0 0 1 .5 8h15a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H.5a.5.5 0 0 1-.5-.5v-1zm0 4a.5.5 0 0 1 .5-.5h15a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5z"
                /></svg
            ></i>
            分类</el-menu-item
          >
          <el-menu-item index="/photoAlbum"
            ><i class="iconfont icon-paper">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-image-fill"
                viewBox="0 0 16 16"
              >
                <path
                  d="M.002 3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-12a2 2 0 0 1-2-2V3zm1 9v1a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12zm5-6.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0z"
                /></svg
            ></i>
            相册</el-menu-item
          >
          <el-menu-item index="/talk"
            ><i class="iconfont icon-speechbubble">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-chat-left"
                viewBox="0 0 16 16"
              >
                <path
                  d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"
                /></svg
            ></i>
            说说</el-menu-item
          >
          <el-menu-item index="/link/list"
            ><i class="iconfont icon-pengyouquan">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-flower1"
                viewBox="0 0 16 16"
              >
                <path
                  d="M6.174 1.184a2 2 0 0 1 3.652 0A2 2 0 0 1 12.99 3.01a2 2 0 0 1 1.826 3.164 2 2 0 0 1 0 3.652 2 2 0 0 1-1.826 3.164 2 2 0 0 1-3.164 1.826 2 2 0 0 1-3.652 0A2 2 0 0 1 3.01 12.99a2 2 0 0 1-1.826-3.164 2 2 0 0 1 0-3.652A2 2 0 0 1 3.01 3.01a2 2 0 0 1 3.164-1.826zM8 1a1 1 0 0 0-.998 1.03l.01.091c.012.077.029.176.054.296.049.241.122.542.213.887.182.688.428 1.513.676 2.314L8 5.762l.045-.144c.248-.8.494-1.626.676-2.314.091-.345.164-.646.213-.887a4.997 4.997 0 0 0 .064-.386L9 2a1 1 0 0 0-1-1zM2 9l.03-.002.091-.01a4.99 4.99 0 0 0 .296-.054c.241-.049.542-.122.887-.213a60.59 60.59 0 0 0 2.314-.676L5.762 8l-.144-.045a60.59 60.59 0 0 0-2.314-.676 16.705 16.705 0 0 0-.887-.213 4.99 4.99 0 0 0-.386-.064L2 7a1 1 0 1 0 0 2zm7 5-.002-.03a5.005 5.005 0 0 0-.064-.386 16.398 16.398 0 0 0-.213-.888 60.582 60.582 0 0 0-.676-2.314L8 10.238l-.045.144c-.248.8-.494 1.626-.676 2.314-.091.345-.164.646-.213.887a4.996 4.996 0 0 0-.064.386L7 14a1 1 0 1 0 2 0zm-5.696-2.134.025-.017a5.001 5.001 0 0 0 .303-.248c.184-.164.408-.377.661-.629A60.614 60.614 0 0 0 5.96 9.23l.103-.111-.147.033a60.88 60.88 0 0 0-2.343.572c-.344.093-.64.18-.874.258a5.063 5.063 0 0 0-.367.138l-.027.014a1 1 0 1 0 1 1.732zM4.5 14.062a1 1 0 0 0 1.366-.366l.014-.027c.01-.02.021-.048.036-.084a5.09 5.09 0 0 0 .102-.283c.078-.233.165-.53.258-.874a60.6 60.6 0 0 0 .572-2.343l.033-.147-.11.102a60.848 60.848 0 0 0-1.743 1.667 17.07 17.07 0 0 0-.629.66 5.06 5.06 0 0 0-.248.304l-.017.025a1 1 0 0 0 .366 1.366zm9.196-8.196a1 1 0 0 0-1-1.732l-.025.017a4.951 4.951 0 0 0-.303.248 16.69 16.69 0 0 0-.661.629A60.72 60.72 0 0 0 10.04 6.77l-.102.111.147-.033a60.6 60.6 0 0 0 2.342-.572c.345-.093.642-.18.875-.258a4.993 4.993 0 0 0 .367-.138.53.53 0 0 0 .027-.014zM11.5 1.938a1 1 0 0 0-1.366.366l-.014.027c-.01.02-.021.048-.036.084a5.09 5.09 0 0 0-.102.283c-.078.233-.165.53-.258.875a60.62 60.62 0 0 0-.572 2.342l-.033.147.11-.102a60.848 60.848 0 0 0 1.743-1.667c.252-.253.465-.477.629-.66a5.001 5.001 0 0 0 .248-.304l.017-.025a1 1 0 0 0-.366-1.366zM14 9a1 1 0 0 0 0-2l-.03.002a4.996 4.996 0 0 0-.386.064c-.242.049-.543.122-.888.213-.688.182-1.513.428-2.314.676L10.238 8l.144.045c.8.248 1.626.494 2.314.676.345.091.646.164.887.213a4.996 4.996 0 0 0 .386.064L14 9zM1.938 4.5a1 1 0 0 0 .393 1.38l.084.035c.072.03.166.064.283.103.233.078.53.165.874.258a60.88 60.88 0 0 0 2.343.572l.147.033-.103-.111a60.584 60.584 0 0 0-1.666-1.742 16.705 16.705 0 0 0-.66-.629 4.996 4.996 0 0 0-.304-.248l-.025-.017a1 1 0 0 0-1.366.366zm2.196-1.196.017.025a4.996 4.996 0 0 0 .248.303c.164.184.377.408.629.661A60.597 60.597 0 0 0 6.77 5.96l.111.102-.033-.147a60.602 60.602 0 0 0-.572-2.342c-.093-.345-.18-.642-.258-.875a5.006 5.006 0 0 0-.138-.367l-.014-.027a1 1 0 1 0-1.732 1zm9.928 8.196a1 1 0 0 0-.366-1.366l-.027-.014a5 5 0 0 0-.367-.138c-.233-.078-.53-.165-.875-.258a60.619 60.619 0 0 0-2.342-.572l-.147-.033.102.111a60.73 60.73 0 0 0 1.667 1.742c.253.252.477.465.66.629a4.946 4.946 0 0 0 .304.248l.025.017a1 1 0 0 0 1.366-.366zm-3.928 2.196a1 1 0 0 0 1.732-1l-.017-.025a5.065 5.065 0 0 0-.248-.303 16.705 16.705 0 0 0-.629-.661A60.462 60.462 0 0 0 9.23 10.04l-.111-.102.033.147a60.6 60.6 0 0 0 .572 2.342c.093.345.18.642.258.875a4.985 4.985 0 0 0 .138.367.575.575 0 0 0 .014.027zM8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"
                /></svg
            ></i>
            友链</el-menu-item
          >
          <el-menu-item index="/message/list"
            ><i class="iconfont icon-liuyan">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-chat-right-text"
                viewBox="0 0 16 16"
              >
                <path
                  d="M2 1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h9.586a2 2 0 0 1 1.414.586l2 2V2a1 1 0 0 0-1-1H2zm12-1a2 2 0 0 1 2 2v12.793a.5.5 0 0 1-.854.353l-2.853-2.853a1 1 0 0 0-.707-.293H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12z"
                />
                <path
                  d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"
                /></svg
            ></i>
            留言</el-menu-item
          >
          <el-menu-item index="/login"
            ><i class="iconfont icon-timerauto"></i> 登录</el-menu-item
          >
          <div class="user flex justify-center items-center">
            <el-sub-menu index="/#">
              <template #title><el-avatar :size="30">123</el-avatar></template>
              <el-menu-item index="/userCenter"
                ><i class="iconfont icon-gerenzhongxin"></i>
                个人中心</el-menu-item
              >
              <el-menu-item index="/logout"
                ><i class="iconfont icon-tuichudenglu"></i> 退出</el-menu-item
              >
            </el-sub-menu>
          </div>
        </el-menu>
      </div>
    </div>
    <div class="mobile_menu flex_r_between">
      <div class="flex items-center">
        <span class="iconfont icon-menu2"> </span>
      </div>

      <div class="flex_r_between">
        <el-drawer
          title="导航"
          direction="ltr"
          :append-to-body="true"
          size="60%"
          :z-index="9999"
        >
          <div class="flex justify-center items-center">
            <el-avatar class="el-avatar" :size="80">456</el-avatar>
            <el-avatar class="el-avatar" :size="80">去登录</el-avatar>
          </div>
          <el-menu class="sub-menu mt-[5px]" :ellipsis="false">
            <el-menu-item index="/home"
              ><i class="iconfont icon-home"></i> 主页</el-menu-item
            >
            <el-menu-item index="/archives"
              ><i class="iconfont icon-icon"></i> 时间轴</el-menu-item
            >
            <el-sub-menu index="/resources">
              <template #title
                ><i class="iconfont icon-menu"></i> 资源导航</template
              >
              <el-menu-item index="/resources/front"
                ><i class="iconfont icon-folder"></i> 前端</el-menu-item
              >
              <el-menu-item index="/resources/back"
                ><i class="iconfont icon-houduankaifa"></i> 后端</el-menu-item
              >
            </el-sub-menu>
            <el-menu-item index="/category"
              ><i class="iconfont icon-sort"></i> 分类</el-menu-item
            >
            <el-menu-item index="/tag"
              ><i class="iconfont icon-label_fill"></i> 标签</el-menu-item
            >
            <el-menu-item index="/photoAlbum"
              ><i class="iconfont icon-paper"></i> 相册</el-menu-item
            >
            <el-menu-item index="/talk"
              ><i class="iconfont icon-speechbubble"></i> 说说</el-menu-item
            >
            <el-menu-item index="/link/list"
              ><i class="iconfont icon-pengyouquan"></i> 友链</el-menu-item
            >

            <el-menu-item index="/message/list"
              ><i class="iconfont icon-liuyan"></i> 留言</el-menu-item
            >
            <el-menu-item index="/logout"
              ><i class="iconfont icon-tuichudenglu"></i> 退出</el-menu-item
            >
          </el-menu>
        </el-drawer>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, h } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ElNotification } from "element-plus";
import BlogSearch from "../../Search/blog-search.vue";

const route = useRoute();
const router = useRouter();

const getPath = computed(() => {
  return route.path;
});

const handleSelect = (val, type) => {
  if (val == "/logout") {
    ElNotification({
      offset: 60,
      title: "提示",
      message: h(
        "div",
        { style: "color: #7ec050; font-weight: 600;" },
        "退出成功"
      ),
    });
  } else {
    router.push(val);
    if (val == "/login") {
      _setLocalItem("blogLastRouter", route.fullPath);
    }
  }
  if (type == "mobile") {
    headerState.drawerShow = false;
  }
};
</script>

<style lang="scss">
.header_box {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2001;
  width: 100%;
  height: 3.6rem;
  overflow: hidden;
  box-sizing: border-box;
  box-shadow: 0 -1px 3px var(--primary);
  background: rgba(255, 255, 255, 0.7);
}
.header_box {
  .sub-avatar {
    padding: 5px 0 0 0;
    display: flex;
    align-items: center;
  }

  .sub-menu {
    height: 53px;

    .icon-sort {
      font-size: 1.2rem;
    }

    .icon-icon,
    .icon-label_fill {
      font-size: 1.3rem;
    }
  }
}

.pc_menu {
  :deep(.el-sub-menu__icon-arrow) {
    display: none;
  }
}

.flex_r_between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.el-menu{
  background: none !important;
}
.el-menu--horizontal > .el-menu-item.is-active {
  border-bottom: none !important;;
  color: var(--el-menu-active-color) !important;
}


:deep(.el-menu--horizontal > .el-sub-menu .el-sub-menu__title:hover) {
  background-color: transparent;
}

.iconfont {
  font-size: 1.2rem;
  margin-right: 5px;
}

.icon-menu2 {
  font-size: 1.4rem;
}

.icon-menu {
  font-size: 1.1rem;
}

.icon-pengyouquan {
  font-size: 1.3rem;
}
.icon-timerauto {
  font-size: 1.1rem;
}

.icon-houduankaifa {
  font-size: 1.2rem;
}

.icon-tuichudenglu {
  font-size: 1.3rem;
}

.icon-liuyan {
  font-size: 1.3rem;
}
.el-menu--horizontal.el-menu {
  border-bottom: none !important;
}
.el-menu .el-menu-item,
.el-sub-menu {
  border-bottom: none;
  font-size: 1rem;
  font-weight: 400;
  padding: 0 10px;
  background-color: transparent;
  i {
    display: flex;
  }
}

.flex_r_around {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
:deep(.el-drawer__close-btn .el-icon) {
  font-size: 22px;
}

.hide-header {
  animation-name: hideHeader;
  animation-duration: 0.8s;
  animation-fill-mode: forwards;
}

.fixed-header {
  animation-name: header;
  animation-duration: 0.8s;
  animation-fill-mode: forwards;
}

@media screen and (min-width: 768px) {
  .pc_menu {
    padding: 0 20px;
  }
}

@keyframes header {
  0% {
    transform: translateY(-52px);
  }

  100% {
    transform: translateY(0px);
  }
}

@keyframes hideHeader {
  0% {
    transform: translateY(0px);
  }

  100% {
    transform: translateY(-52px);
  }
}
</style>