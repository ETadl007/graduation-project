<template>
  <div class="right-side">
    <el-row>
      <el-col :span="24" class="right-side-space right-side-space1">
        <el-card class="info-card card-hover animate__animated animate__fadeIn" shadow="hover">
          <el-skeleton :loading="false" animated>
            <template #template>
              <RightSideTopSkeleton />
            </template>
            <template #default>
              <RightSideTop />
            </template>
          </el-skeleton>
        </el-card>
      </el-col>
      <el-col :xs="0" :sm="24" class="right-side-space right-side-space2">
        <el-card
          class="right-card card-hover flex_c_center animate__animated animate__fadeIn"
          shadow="hover"
        >
          <el-skeleton :loading="false" animated>
            <template #template>
              <RightSideSkeletonItem />
            </template>
            <template #default>
              <RightSideItem icon="icon-gonggao" title="公告" color="#f00">
                <div class="notice-text">博客通知</div>
              </RightSideItem>
            </template>
          </el-skeleton>
        </el-card>
      </el-col>
      <el-col :xs="0" :sm="24" class="right-side-space right-side-space3">
        <el-card
          class="right-card card-hover flex_c_center animate__animated animate__fadeIn"
          shadow="hover"
        >
          <el-skeleton :loading="false" animated>
            <template #template>
              <RightSideSkeletonItem />
            </template>
            <template #default>
              <RightSideItem size="1.5rem" color="#76d703" icon="icon-jiaoliuye" title="交流">
                <div class="group">
                  交流群
                  <div class="flex justify-end items-start flex-nowrap">
                    <div class="grid place-items-center">
                      <el-image
                        class="img"
                        fit="cover"

                        preview-teleported
                        lazy
                      >
                        <!-- <template #error>
                          <div class="w-[100%] h-[100%] grid place-items-center">
                            <svg-icon name="image404" :width="4" :height="4"></svg-icon>
                          </div>
                        </template> -->
                      </el-image>
                    </div>
                    <div class="grid place-items-center">
                      <el-image
                        class="img !ml-[10px]"
                       
                        fit="cover"
                        preview-teleported
                        lazy
                      >
                        <!-- <template #error>
                          <div class="w-[100%] h-[100%] grid place-items-center">
                            <svg-icon name="image404" :width="4" :height="4"></svg-icon>
                          </div>
                        </template> -->
                      </el-image>
                    </div>
                  </div>
                </div>
                <div class="group">
                  支持作者
                  <div class="flex justify-end items-start flex-nowrap">
                    <div class="grid place-items-center">
                      <el-image
                        class="img"
                        fit="cover"
                        preview-teleported
                        lazy
                      >
                        <!-- <template #error>
                          <div class="w-[100%] h-[100%] grid place-items-center">
                            <svg-icon name="image404" :width="4" :height="4"></svg-icon>
                          </div>
                        </template> -->
                      </el-image>
                    </div>
                    <div class="grid place-items-center" >
                      <el-image
                        class="img !ml-[10px]"
                        fit="cover"
                        preview-teleported
                        lazy
                      >
                        <!-- <template #error>
                          <div class="w-[100%] h-[100%] grid place-items-center">
                            <svg-icon name="image404" :width="4" :height="4"></svg-icon>
                          </div>
                        </template> -->
                      </el-image>
                    </div>
                  </div>
                </div>
              </RightSideItem>
            </template>
          </el-skeleton>
        </el-card>
      </el-col>
      <el-col :xs="0" :sm="24" class="right-side-space right-side-space4">
        <el-card
          class="right-card card-hover flex_c_center animate__animated animate__fadeIn"
          shadow="hover"
        >
          <el-skeleton :loading="false" animated>
            <template #template>
              <RightSideSkeletonItem />
            </template>
            <template #default>
              <RightSideItem icon="icon-localoffer" title="标签">
                <div class="notice-text">
                  标签
                </div>
              </RightSideItem>
            </template>
          </el-skeleton>
        </el-card>
      </el-col>
      <el-col :xs="0" :sm="24" class="right-side-space right-side-space5">
        <el-card class="right-card card-hover flex_c_center" shadow="hover">
          <el-skeleton :loading="false" animated>
            <template #template>
              <RightSideSkeletonItem />
            </template>
            <template #default>
              <RightSideItem icon="icon-zixun" size="1.4rem" title="网站资讯">
                <div class="site-info">
                  <div class="flex_r_between">
                    <span>文章数目：</span>
                    86
                  </div>
                  <div class="flex_r_between">
                    <span>运行时间：</span>
                    <span>
                      85
                      天
                    </span>
                  </div>
                  <div class="flex_r_between">
                    <span>博客访问次数：</span>
                    123
                  </div>
                </div>
              </RightSideItem>
            </template>
          </el-skeleton>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { nextTick, onMounted } from "vue";
import RightSideSkeletonItem from "@/components/RightSide/components/skeleton/right-side-skeleton-item.vue";
import RightSideTopSkeleton from "@/components/RightSide/components/skeleton/right-side-top-skeleton.vue";
import RightSideItem from "@/components/RightSide/components/item/right-side-item.vue";
import RightSideTop from "@/components/RightSide/components/item/right-side-top.vue";

// defineProps({
//   configDetail: {
//     type: Object,
//     default: () => {},
//   },
//   runtime: {
//     type: [String, Number],
//     default: "两年半",
//   },
//   loading: {
//     type: Boolean,
//     default: false,
//   },
//   tags: {
//     type: Array,
//     default: () => {},
//   },
// });

</script>

<style lang="scss" scoped>
.right-side {
  width: 100%;

  .info-card {
    height: 29rem;
  }

  .right-card {
    padding: 1rem 1.8rem;
    color: var(--font-color);
    min-height: 10rem;

    .card-title {
      font-size: 1.2rem;
      line-height: 2.4;

      .icon-gonggao {
        font-weight: 900;
        color: #f00;
      }

      .icon-speechbubble,
      .icon-schedule,
      .icon-localoffer {
        font-weight: 900;
      }

      span {
        margin-left: 0.3rem;
      }
    }

    .notice-text {
      min-height: 6rem;
      font-size: 1.1rem;
      line-height: 1.2;
      white-space: pre-line;

      &__item {
        display: inline-block;
        font-weight: bold;
        cursor: pointer;
      }
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
.el-card {
    border: none;
    border-radius: 5px 5px 8px 8px;
    box-shadow: var(--card-box-shadow) !important;
    background: rgba(255, 255, 255, .3);
    transition: all .3s;
}
</style>