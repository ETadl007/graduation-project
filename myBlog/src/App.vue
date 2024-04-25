<template>
  <div class="app">
    <router-view></router-view>
  </div>
  <SpeedInsights />
</template>


<script setup>
import { SpeedInsights } from '@vercel/speed-insights/vue';
</script>


<style scoped>
.app {
  width: 100%;
  box-sizing: border-box;
}

.icon-fanhui {
  position: fixed;
  left: 5px;
  top: 60px;
  font-size: 2.2rem;
  color: var(--font-color);
  z-index: 999;
}
</style>
