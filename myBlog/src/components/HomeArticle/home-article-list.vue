<template>
  <el-row class="root">
    <template v-if="param.loading">
      <el-col v-for="item in 5" :key="item">
        <el-card class="card-hover">
          <div class="article-box">
            <el-skeleton :loading="param.loading" style="height: 100%" animated>
              <template #template>
                <ArticleSkeleton />
              </template>
            </el-skeleton>
          </div>
        </el-card>
      </el-col>
    </template>
    <template v-else>
      <el-col v-for="item in 5" :key="item">
        <el-card class="card-hover">
          <div class="article-box">
            <div class="article-cover">
              <el-image class="image"  fit="cover" />
            </div>
            <div class="article-info flex_c_between">
              <div class="title">文章标题</div>
              <div class="meta">
                <span class="iconfont icon-zhiding"></span>
                <span class="meta-label">置顶</span>
                <span class="article-meta__separator"></span>
                <span class="iconfont icon-icon1"></span>
                <span class="meta-label">分类</span>
                <span class="article-meta__separator"></span>
                <span class="iconfont icon-chakan"></span>
                <span class="meta-value">100</span>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </template>
  </el-row>
</template>

<script setup>
import { nextTick, watch } from "vue";
import ArticleSkeleton from "./components/article-skeleton.vue";
import { numberFormate } from "@/utils/tool";
import Tooltip from "../ToolTip/tooltip.vue";

import { gsapTransY } from "@/utils/transform";
import { isMobile } from "@/utils/tool";

const props = defineProps({
  articleList: {
    type: Array,
    default: () => {},
  },
  articleTotal: {
    type: Number,
    default: 0,
  },
  param: {
    type: Object,
    default: () => {},
  },
});

const param = {
  loading: false
};

watch(
  () => props.articleList,
  () => {
    if (!props.articleList.length) return;
    nextTick(() => {
      let listArticle = [];
      for (let i = 0; i < props.articleList.length; i++) {
        if (!isMobile()) {
          if (i >= 1) {
            listArticle.push(".article" + i);
          }
        } else {
          listArticle.push(".article" + i);
        }
      }
      gsapTransY(listArticle, 30, 0.6, "none");
    });
  }
);
</script>

<style lang="scss" scoped>
.article-cover {
  .image {
    width: 100%;
    height: 100%;
    vertical-align: bottom;
  }
}

.no-article {
  color: var(--font-color);
  margin: 10px auto;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
}

.article-info {
  .title {
    display: inline-block;
    width: 100%;
    font-size: 1.8rem;
    color: var(--font-color);
    font-weight: 600;
    line-height: 3;
    transition: 0.2s ease-in-out;

    &:hover {
      cursor: pointer;
      color: var(--primary);
    }
  }

  .meta {
    color: var(--meta-color);
    line-height: 1.4;
    font-size: 100%;
    font-weight: 500;

    .icon-zhiding {
      font-size: 1rem;
      color: var(--top);
    }

    &-label {
      padding-right: 0.2rem;
    }

    &-value {
      padding-right: 0.2rem;
    }

    .icon-label_fill {
      font-size: 1.2rem;
    }

    .icon-icon1 {
      font-size: 1.2rem;
    }

    .icon-chakan {
      font-size: 1.2rem;
    }

    .article-meta__separator {
      margin: 0 0.4rem;
      font-size: 1.1rem;
      position: relative;

      &::after {
        content: "|";
        position: absolute;
        top: -3px;
        right: 0;
      }
    }

    i {
      margin: 0 0.2rem 0 0;
    }
  }
}

@media screen and (max-width: 768px) {
  .article-box {
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    align-items: center;
    height: 30rem;
  }

  .article-cover {
    width: 100%;
    height: 18rem;
    overflow: hidden;
  }

  .article-info {
    width: 100%;
    padding: 1rem 1.5rem;
    overflow: hidden;
    display: inline-block;
  }
}

// pc
@media screen and (min-width: 768px) {
  .article-box {
    display: flex;
    align-items: center;
    height: 20rem;
  }

  .article-cover {
    width: 45%;
    height: 100%;
    overflow: hidden;
  }

  .article-info {
    width: 55%;
    padding: 0 40px;
    overflow: hidden;
    display: inline-block;
  }
}
.el-card {
  border: none;
  border-radius: 5px 5px 8px 8px;
  box-shadow: var(--card-box-shadow) !important;
  background: rgba(255, 255, 255, 0.3);
  transition: all 0.3s;
}
.card-hover:hover {
    box-shadow: var(--card-hover-box-shadow) !important;
    transform: translateY(-3px);
}

.el-card {
    border: none;
    border-radius: 5px 5px 8px 8px;
    box-shadow: var(--card-box-shadow) !important;
    background: rgba(255, 255, 255, .3);
    transition: all .3s;
}
</style>