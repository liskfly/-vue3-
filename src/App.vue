<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <RouterView v-slot="{ Component }">
    <keep-alive :exclude="['choice', 'magazine', 'article', 'audioDetail', 'audioSeries']">
      <component :is="Component" />
    </keep-alive>
  </RouterView>



  <!-- <div class="audio-box" v-show="true" @click="goToAudioPlay">
    <audio :src="audioSrc" ref="audio" @timeupdate="getCurr" autoplay></audio>
    <img src="@/assets/img/Zg.png" alt="sh" @click.stop="clearAudio" />
    <p v-for="a in audioCon" :key="a.title">{{ a.title }}</p>
    <i></i>
    <div class="control" :class="{ showbox: playAudio }" @click.stop="stopAudio"></div>
  </div> -->
</template>

<style scoped lang="scss">
.audio-box {
  display: flex;
  gap: 10px;
  align-items: center;
  position: fixed;
  left: 3vw;
  bottom: 60px;
  border-radius: 5px;
  padding: 6px 10px;
  width: 94vw;
  height: 40px;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;

  img {
    width: 24px;
    height: 24px;
  }

  p {
    flex: 1;
    color: #fff;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  i {
    width: 16px;
    height: 16px;
    background-image: url(@/assets/img/oK.png);
    background-size: contain;
  }

  .control {
    width: 28px;
    height: 28px;
    background-image: url(@/assets/img/ZR.png);
    background-size: contain;
  }

  .showbox {
    background-image: url(@/assets/img/x5.png);
  }
}
</style>
