<script setup lang="ts">
import type { AudioSeries } from "../typing"
import { defineProps, ref, toRefs } from 'vue'

const props = defineProps({
  content: String
});
const { content } = toRefs(props)

</script>

<template>
  <div class="introduction">
    <div v-html="content">
    </div>
  </div>
</template>

<style lang="scss">
.introduction {
  margin-top: 20px;

  p {
    font-size: 14px;
    line-height: 20px;
    margin-top: 10px;
    text-indent: 2em;
  }
}
</style>