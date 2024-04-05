<template>
  <div class="search">
    <span class="iconfont icon-nav-search scale" @click="clickSearchIcon"
      ><svg
        xmlns="http://www.w3.org/2000/svg"
        width="25"
        height="25"
        fill="currentColor"
        class="bi bi-search"
        viewBox="0 0 16 16"
      >
        <path
          d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
        /></svg
    ></span>
    <div v-if="isClick">
      <el-dialog v-model="searchShow" :show-close="true" width="350">
        <template #header="{ close, titleId, titleClass }">
          <div class="search-header">
            <h4 :id="titleId" :class="titleClass">搜索</h4>
          </div>
        </template>
        <div class="el-dialog__body">
          <el-input
            v-model="input"
            class="search-input"
            placeholder="请输入搜索内容"
            clearable
            @clear="searchInfo"
            @change="searchInfo"
          />
          <div class="search-main__box">
            <div class="empty">
              <div class="hot-box">
                <div class="hot-box__search">
                  <div class="history">
                    <div class="search-result-box">
                      <div class="!mt-[5px]">
                        <div class="text_overflow title cursor-pointer">
                          
                        </div>
                        <div class="flex items-center">
                          <span class="text_overflow content highlight"
                            ></span
                          >
                          <span class="text_overflow content"></span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div class="flex_r_between">
                        <span>搜索历史</span>
                        <span class="clear-history">
                          清空搜索历史
                          <i class="iconfont icon-off-search"></i>
                        </span>
                      </div>
                      <span class="history-search">
                        <el-tag class="history-search-tag"></el-tag>
                      </span>
                    </div>
                  </div>
                  <div class="hot-search">
                    <div class="flex_r_between">
                      热门推荐
                      <i class="iconfont icon-hot"></i>
                    </div>
                    <div class="hot-box__recommend" style="margin: 0.3rem">
                      <span class="title">
                        <span class="number-icon"></span>
                        <span class="article-title text_overflow"></span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";

const formLabelWidth = "140px";
const input = ref(""); // 搜索内容

const isClick = ref(false);
const searchShow = ref(false);

const clickSearchIcon = () => {
  // 打开搜索框
  isClick.value = true;
  searchShow.value = true;
};

const handleClose = () => {
  // 关闭搜索框
  searchShow.value = false;
};

const searchInfo = () => {
  // 搜索方法
  if (input.value != "") {
    console.log(1);
  } else {
    console.log(2);
  }
};
</script>

<style lang="scss" scoped>
.el-dialog .el-dialog__body {
  padding: 10px 10px;
}
.search {
  margin-right: 2rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.search .iconfont {
  margin-top: 8px;
  cursor: pointer;
  color: var(--font-color);
}
.search-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 16px;
  align-items: center;
  height: 40px;
}

.search-main__box {
  margin-top: 10px;
  overflow: hidden;
  .empty {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.search-result-box {
  max-height: 250px;
  overflow: auto;
}
.search-input {
  height: 35px;
  border-radius: 8px;
  :deep(.el-input__prefix-inner) {
    font-size: 1.6rem;
  }
  :deep(.el-input__wrapper.is-focus) {
    box-shadow: 0 0 0 1px var(--primary) inset;
  }
}
.empty {
  width: 100%;
}
.hot-box {
  width: 100%;
  height: 100%;
  overflow: hidden;
  cursor: pointer;
  &__search {
    font-weight: 500;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
  .icon-hot {
    font-size: 1.4rem;
    color: var(--hot-color);
  }
  .history {
    width: 50%;
    height: 100%;
    padding: 0 0.5rem;
    overflow: auto;
    .clear-history,
    .icon-off-search {
      font-size: 0.8rem;
      cursor: pointer;
    }
    &-search {
      padding: 0.3rem 0;
      &-tag {
        margin: 0.3rem;
      }
    }
    .title {
      font-size: 1rem;
      color: var(--font-color);
    }
    .content {
      font-size: 0.8rem;
      color: var(--font-color);
    }
    .highlight {
      background: #c6e0ff;
      display: inline-block;
      margin: 0 0.3rem;
      cursor: pointer;
    }
  }
  .hot-search {
    width: 50%;
    height: 100%;
    padding: 0 0.5rem;
    overflow: hidden;
  }
  &__recommend {
    height: 2rem;
    display: flex;
    align-items: center;
    .title {
      position: absolute;
      padding-left: 1rem;
      display: inline-block;
    }
    .number-icon {
      position: absolute;
      top: 0;
      left: -0.4rem;
      color: var(--hot-color);
    }
    .article-title {
      display: inline-block;
      width: 180px;
    }
  }
}
</style>