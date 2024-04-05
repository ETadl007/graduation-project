<template>
  <div class="layout">
    <BlogHeader></BlogHeader>
    <BlogMain></BlogMain>
    <BlogFooter></BlogFooter>
  </div>
</template>
<script setup>
import BlogHeader from "./header/blog-header.vue";
import BlogMain from "./main/blog-main.vue";
import BlogFooter from "./footer/blog-footer.vue";
</script>

<style lang="scss" scoped>
.layout {
  background: linear-gradient(
    90deg,
    #ffffff 1%,
    #ead2ea 10.2%,
    #e4d5ee 19.6%,
    #d1def3 36.8%,
    #b5dee5 62.2%,
    #cfebf3 88.9%,
    #ffffff 99%
  ) !important;
}
</style>
