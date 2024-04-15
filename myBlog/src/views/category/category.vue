<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const categoryList = ref([]);
const loading = ref(false);

const goToArticleList = (item) => {
  router.push({
    path: "/articleList",
    query: { id: item.id, type: "category", name: item.category_name },
  });
};
</script>

<template>
  <PageHeader :loading="loading" />
  <div class="category center_box">
    <el-card class="category-card">
      <div class="category-total flex_center">分类 - 123</div>
      <el-row v-if="loading">
        <el-skeleton
          v-if="loading"
          class="category-item"
          :loading="loading"
          :rows="1"
          animated
        />
      </el-row>
      <el-row v-else>
        <el-col :span="24" class="category-item">
          <span
            v-for="(item, i) in 2"
            :key="i"
            :style="{ fontSize: item.fontSize + 'rem', color: item.fontColor }"
            class="category-item__label scale animate__animated animate__fadeInDown"
          >
            前端
          </span>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.category {
  &-card {
    padding: 40px 30px;
  }

  &-total {
    font-size: 1.4rem;
    line-height: 2;
    font-weight: 600;
    color: var(--font-color);
  }

  &-item {
    padding: 10px;
    box-sizing: border-box;
    text-align: center;

    &__label {
      display: inline-block;
      font-weight: bold;
      padding: 0 0.8rem;
    }
  }
}
@media screen and (min-width: 768px) {
  .center_box {
    padding: 2.8rem 10px;
    max-width: 1000px;
    margin: 0 auto;
    min-height: calc(100vh - 35rem);
  }
}

.center_box {
  animation: Up-84b1155e 0.6s ease-in-out forwards;
}
.category-card {
    padding: 40px 30px;
}

.el-card {
    border: none;
    border-radius: 5px 5px 8px 8px;
    box-shadow: var(--card-box-shadow) !important;
    background: rgba(255, 255, 255, .3);
    transition: all .3s;
}
.flex_center {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
