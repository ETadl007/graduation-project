<template>
  <el-timeline class="my-timeline">
    <el-skeleton v-if="false" :loading="loading" animated class="skeleton">
      <template #template>
        <SkeletonItem variant="text" width="4rem" height="2rem" />
        <SkeletonItem
          class="skeleton-left"
          variant="text"
          width="0.5rem"
          height="60rem"
        />
        <div class="flex_r_start skeleton-right" v-for="i in 10" :key="i">
          <SkeletonItem variant="image" width="8rem" height="8rem" />
          <div class="flex_c_center skeleton-right__item">
            <SkeletonItem variant="text" width="4rem" height="25px" />
            <SkeletonItem
              variant="text"
              width="6rem"
              top="1rem"
              height="15px"
            />
          </div>
        </div>
      </template>
    </el-skeleton>
    <template v-else>
      <div v-for="item in 2" :key="item">
        <div class="year to_pointer">123</div>
        <el-timeline-item
          v-for="article in 2"
          size="large"
          :hollow="true"
          hide-timestamp
          :center="true"
          class="my-timeline-item border-orange"
        >
          <div class="flex_r_start timeline">
            <div class="timeline-cover scale">
              <el-image
                class="w-[100%] h-[100%]"
                fit="cover"
                @click="goToArticle(article)"
              >
              </el-image>
            </div>
            <div class="timeline-info" @click="goToArticle(article)">
              <div class="timeline-info__title">12</div>
              <div class="timeline-info__time">2024-21</div>
            </div>
          </div>
        </el-timeline-item>
      </div>
    </template>
  </el-timeline>
</template>

<script setup>
import { ref } from "vue";
import SkeletonItem from "../SkeletonItem/skeleton-item.vue";
import { useRouter } from "vue-router";
const router = useRouter();

const goToArticle = (article) => {
  router.push({ path: "/article", query: { id: article.id } });
};

const loading = ref(false);
</script>

<style lang="scss" scoped>
.year {
  font-size: 1.8rem;
  font-weight: 500;
  color: var(--md-active);
}
.timeline {
  padding: 1rem 0;

  &-cover {
    width: 100px;
    height: 100px;
    margin-right: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &-info {
    flex: 1;
    &__total {
      font-size: 1.8rem;
      padding: 5px;
      font-weight: bold;
      color: var(--font-color);
    }
    &__title {
      font-size: 1.2rem;
      padding: 5px;
      font-weight: bold;
      color: var(--font-color);
      cursor: pointer;
      &:hover {
        color: var(--primary);
      }
    }
    &__time {
      padding: 5px;
      font-weight: bold;
      color: var(--font-color);
    }
  }
}
.border-orange {
  :deep(.el-timeline-item__node) {
    &.is-hollow {
      border-color: var(--primary) !important;
      &:hover {
        transform: scale(1.2);
        border-color: var(--second-font-color) !important;
      }
    }
  }
}
.my-timeline {
  width: 100%;
  margin-bottom: 2rem;
  .my-timeline-item {
    padding-top: 5px;
    :deep(.el-timeline-item__tail) {
      height: 100%;
      top: 32px;
      border-left: 3px solid var(--hr-border);
    }
    &:first-child {
      :deep(.el-timeline-item__node) {
        left: -5px;
        width: 1.4rem;
        height: 1.4rem;
        &.is-hollow {
          border-width: 4px;
          border-color: var(--border-color);
          background-color: var(--global-white);
        }
      }
    }
    &:last-child {
      :deep(.el-timeline-item__tail) {
        height: calc(100% - 30px);
      }
    }
    :deep(.el-timeline-item__node) {
      left: -2px;
      width: 1rem;
      height: 1rem;
      &.is-hollow {
        border-width: 3px;
        border-color: var(--border-color);
        background-color: var(--global-white);
        &:hover {
          border-color: var(--primary);
        }
      }
    }
    :deep(.el-timeline-item__wrapper) {
      display: flex;
      align-items: center;
      margin-left: 1rem;
    }
  }
}
.skeleton {
  position: relative;
  &-left {
    position: absolute;
    left: 0;
    top: 4rem;
  }
  &-right {
    margin-left: 30px;
    margin-top: 20px;
    &__item {
      width: 100px;
      height: 100px;
    }
  }
}
.timeline {
  padding: 1rem 0px;
}

.flex_r_start {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
</style>