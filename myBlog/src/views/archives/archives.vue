<template>
  <div class="archives">
    <el-row class="center_box">
      <el-col :span="24">
        <el-card class="archives-card">
          <TimeLine :loading="false"></TimeLine>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { ref, reactive } from "vue";
import TimeLine from "@/components/TimeLine/time-line.vue";

let archivesTotal = ref(5); // 记录总数
const archives = ref([]);

let param = reactive({
  // 放置页码及相关数据
  current: 1, //当前页
  size: 5, //每页条目数
});

const pagination = (page) => {
  param.current = page.current;
  getArchives();
};
</script>


<style lang="scss" scoped>
.archives {
  &-card {
    padding: 40px 50px;
  }
}
@media screen and (min-width: 768px) {
  .center_box {
    padding: 2.8rem 10px;
    max-width: 1000px;
    margin: 0px auto;
    min-height: calc(-35rem + 100vh);
  }
}

.center_box {
  animation: 0.6s ease-in-out 0s 1 normal forwards running Up-7974355d;
}
.archives-card {
  padding: 40px 50px;
}

.el-card {
  border: none;
  border-radius: 5px 5px 8px 8px;
  background: rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease 0s;
  box-shadow: var(--card-box-shadow) !important;
}
</style>