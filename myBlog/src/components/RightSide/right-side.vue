<template>
  <div class="right-side">
    <el-row>
      <el-col :span="24" class="right-side-space right-side-space1">
        <el-card class="info-card card-hover animate__animated animate__fadeIn" shadow="hover">
          <el-skeleton :loading="false" animated>
            <template #template>
              456
            </template>
            <template #default>
              123
            </template>
          </el-skeleton>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>

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
</style>