<template>
  <div class="home_center_box">
    <el-row>
      <el-col :xs="24" :sm="18">
        <el-card
          class="mobile-top-card mobile-card info-card animate__animated animate__fadeIn"
          shadow="hover"
        >
          <el-skeleton :loading="rightSizeLoading" animated>
            <template #template>
              <MobileTopSkeleton />
            </template>
            <template #default>
              <RightSideTop />
            </template>
          </el-skeleton>
        </el-card>
        <!-- 博客文章 -->
        <HomeArticleList
          :articleList="articleList"
          :param="param"
          :articleTotal="articleTotal"
        ></HomeArticleList>
        <el-card
          class="mobile-bottom-card card-hover mobile-card info-card animate__animated animate__fadeIn"
          shadow="hover"
        >
          <el-skeleton :loading="rightSizeLoading" animated>
            <template #template>
              <RightSideSkeletonItem />
            </template>
            <template #default>
              <RightSideItem icon="icon-zixun" size="1.4rem" title="网站资讯">
                <div class="site-info">
                  <div class="flex_r_between">
                    <span>文章数目：</span>
                    <span class="value">10</span>
                  </div>
                  <div class="flex_r_between">
                    <span>运行时间：</span>
                    <span class="value">50 天</span>
                  </div>
                  <div class="flex_r_between">
                    <span>博客访问次数：</span>
                    <span class="value">155</span>
                  </div>
                  <div class="group">
                    交流群
                    <div class="flex justify-end items-start flex-nowrap">
                      <div>
                        <el-image
                          class="img"
                          fit="cover"
                          preview-teleported
                          lazy
                        >
                        </el-image>
                      </div>
                      <div>
                        <el-image
                          class="img !ml-[10px]"
                          fit="cover"
                          preview-teleported
                          lazy
                        >
                        </el-image>
                      </div>
                    </div>
                  </div>
                  <div class="group">
                    支持作者
                    <div class="flex justify-end items-start flex-nowrap">
                      <div>
                        <el-image
                          class="img"
                          fit="cover"
                          preview-teleported
                          lazy
                        >
                        </el-image>
                      </div>
                      <div>
                        <el-image
                          class="img !ml-[10px]"
                          fit="cover"
                          preview-teleported
                          lazy
                        >
                        </el-image>
                      </div>
                    </div>
                  </div>
                </div>
              </RightSideItem>
            </template>
          </el-skeleton>
        </el-card>
      </el-col>

      <el-col :xs="0" :sm="6">
        <RightSide> </RightSide>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, nextTick } from "vue";

import { homeGetArticleList } from "@/api/article";

import { gsapTransY } from "@/utils/transform";
import HomeArticleList from "@/components/HomeArticle/home-article-list.vue";
import RightSide from "@/components/RightSide/right-side.vue";
import MobileTopSkeleton from "@/components/RightSide/components/skeleton/mobile-top-skeleton.vue";
import RightSideItem from "@/components/RightSide/components/item/right-side-item.vue";
import RightSideTop from "@/components/RightSide/components/item/right-side-top.vue";
import RightSideSkeletonItem from "@/components/RightSide/components/skeleton/right-side-skeleton-item.vue";

/** 文章 */
const param = reactive({
  current: 1, // 当前页
  size: 5, // 每页条目数
  loading: true, // 加载
});
const articleList = ref([]);
const articleTotal = ref();

const getHomeArticleList = async () => {
  try {
    let res = await homeGetArticleList(param.current, param.size);
    if (res.status == 0) {
      const { list, total } = res.data;
      articleList.value = list;
      articleTotal.value = total;
    }
  } finally {
    param.loading = false;
  }
};

/** 网站右侧 */
const rightSizeLoading = ref(false);
const runtime = ref(0);
let configDetail = ref({});
let tags = ref([]);

const observeMobileBox = () => {
  nextTick(() => {
    gsapTransY(
      [".mobile-top-card", ".mobile-bottom-card"],
      -30,
      0.5,
      "bounce.in"
    );
    gsapTransY([".mobile-bottom-card"], 30, 0.6, "none");
  });
};

const init = async () => {
  param.loading = true;
  rightSizeLoading.value = true;
  await getHomeArticleList("init");
  await observeMobileBox();
};

onMounted(async () => {
  init();
});
</script>

<style lang="scss" scoped>
.home_center_box {
  padding-top: 80px;
  max-width: 1200px;
  margin: 0 auto;
  min-height: calc(100vh - 128px);
}
.mobile-top-card {
  height: 31rem;
  margin: 4px;
  :deep(.info-avatar) {
    padding: 0 2rem;
  }
  :deep(.personal-say) {
    padding-left: 1rem;
  }
  :deep(.info-background) {
    height: 12rem;
    width: 100%;
  }
  :deep(.common-menu) {
    padding: 1rem 5.5rem;
  }
  :deep(.git-ee) {
    padding: 0 4rem;
  }
  :deep(.personal-link) {
    padding: 1rem 6rem;
  }
}
.mobile-bottom-card {
  margin: 4px;
  padding: 1rem;
  .icon-localoffer {
    font-weight: 900;
  }
  span {
    margin-left: 0.3rem;
  }
  .site-info {
    padding: 0.3rem 1rem;
    line-height: 2;
    font-size: 1rem;

    .value {
      font-weight: 600;
    }
  }
}

.group {
  margin-left: 0.3rem;
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  .img {
    width: 80px;
    height: 80px;
  }
}
@media screen and (min-width: 768px) {
  .avatar-show,
  .mobile-top-card,
  .mobile-bottom-card {
    display: none;
  }
}
</style>