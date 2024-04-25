<template>
  <!-- 最外层 div 是占位置的 -->
  <div class="footer_box flex flex-col items-center justify-center">
    <!-- eslint-disable-next-line -->
    <div class="footer-color">&copy 小炮 2024-4-1</div>
    <a class="footer-color change-color mt-[5px]" href="http://beian.miit.gov.cn/" target="_blank"
      >2814753920</a
    >
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.footer-color {
  color: var(--font-color);
  text-align: center;
}

.change-color {
  text-decoration: none;
  transition: all 0.3s;

  &:hover {
    color: var(--global-black);
  }
}
</style>
