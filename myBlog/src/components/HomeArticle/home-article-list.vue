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
      <el-col v-for="item in articleList" :key="item.id">
        <el-card class="card-hover">
          <div class="article-box">
            <div class="article-cover">
              <el-image class="image" fit="cover" />
            </div>
            <div class="article-info flex_c_between">
              <div class="title">{{ item.article_title }}</div>
              <div class="meta">
                <span v-if="item.is_top == 1" class="to_pointer">
                  <i class="iconfont icon-zhiding"></i>
                  <span class="meta-label">置顶</span>
                </span>
                <span
                  v-if="item.is_top == 1"
                  class="article-meta__separator"
                ></span>
                <span class="to_pointer">
                  <i class="iconfont icon-calendar2"></i>
                  <span class="meta-label">发表于</span>
                  <span class="meta-value">{{ item.createdAt }}</span>
                </span>
                <span class="article-meta__separator"></span>
                <span class="to_pointer">
                  <i class="iconfont icon-schedule"></i>
                  <span class="meta-label">更新于</span>
                  <span class="meta-value">{{ item.updatedAt }}</span>
                </span>
                <span class="article-meta__separator"></span>
                <span class="to_pointer" @click="operate('category', item)">
                  <i class="iconfont icon-folder"></i>
                  <span class="meta-value">{{ item.categoryName }}</span>
                </span>
                <span class="to_pointer" @click="operate('tag', item)">
                  <i class="iconfont icon-label_fill"></i>
                  <span
                    class="meta-value"
                    v-for="(tagName, index) in item.tagNameList"
                    :key="index"
                  >
                    {{
                      index == item.tagNameList.length - 1
                        ? tagName
                        : tagName + "、"
                    }}
                  </span>
                </span>
                <span class="article-meta__separator"></span>
                <span class="to_pointer">
                  <i class="iconfont icon-icon1"></i>
                  <GsapCount
                    class="meta-value"
                    v-if="item.thumbs_up_times - 0 < 1000"
                    :value="numberFormate(item.thumbs_up_times)"
                  />
                  <span v-else class="meta-value">
                    {{ numberFormate(item.thumbs_up_times) }}
                  </span>
                </span>
                <span class="article-meta__separator"></span>
                <span class="to_pointer">
                  <i class="iconfont icon-chakan"></i>
                  <GsapCount
                    class="meta-value"
                    v-if="item.view_times - 0 < 1000"
                    :value="numberFormate(item.view_times)"
                  />
                  <span v-else class="meta-value">
                    {{ numberFormate(item.view_times) }}
                  </span>
                </span>
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
import GsapCount from "@/components/GsapCount/index";
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

/* 文章操作 start */
const operate = (type, item) => {
  switch (type) {
    case "detail":
      router.push({ path: "/article", query: { id: item.id } });
      break;
    case "tag":
      router.push({ path: "/tag" });
      break;
    case "category":
      router.push({ path: "/category" });
      break;
  }
};
/* 文章操作 end */

const param = {
  loading: false,
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
  background: rgba(255, 255, 255, 0.3);
  transition: all 0.3s;
}
</style>