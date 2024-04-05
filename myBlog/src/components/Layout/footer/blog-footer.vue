<template>
  <div class="footer_box flex flex-col items-center justify-center">
    <div class="footer-color">&copy 2023</div>
    <a
      class="footer-color change-color mt-[5px]"
      href="http://beian.miit.gov.cn/"
      target="_blank"
      >2814753920</a
    >
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.footer_box {
    width: 100%;
    z-index: 2009;
    height: 10rem;
    overflow: hidden;
    background: rgba(255, 255, 255, .3);
    -webkit-backdrop-filter: saturate(100%) blur(3px);
    backdrop-filter: saturate(100%) blur(3px);
    overflow-x: hidden;
    box-sizing: border-box;
}
.footer-color {
    color: var(--font-color);
    text-align: center;
}
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
