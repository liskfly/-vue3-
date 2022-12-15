<script setup lang="ts">
import { ref, onBeforeMount, watch } from "vue";
import { RouterLink, RouterView } from "vue-router";
import { storeToRefs } from "pinia";
import { ArticleCollection } from "@/stores/counter";

const store = ArticleCollection();
const { lightAndFont } = storeToRefs(store);
</script>

<template>
  <div class="dark" v-show="!lightAndFont.isLight"></div>
  <RouterView v-slot="{ Component }">
    <keep-alive :exclude="['login', 'choice', 'collection', 'theme', 'magazine', 'articlePage','audioPage','subject','typeSearch']">
      <component :is="Component" />
    </keep-alive>
  </RouterView>
</template>

<style lang="scss" scoped>
.dark {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  background-color: rgba(0, 0, 0,0.1);
  z-index: 1000;
  pointer-events: none;
}
</style>
