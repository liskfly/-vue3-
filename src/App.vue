<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";

</script>

<template>
  <!-- <RouterView></RouterView> -->

  <RouterView v-slot="{ Component }">
    <keep-alive :exclude="['choice', 'magazine', 'article','audio']">
      <component :is="Component" />
    </keep-alive>
  </RouterView>
</template>

<style scoped>

</style>
