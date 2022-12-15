<script setup lang="ts">
import { API } from "../apis/getData"
import { ref, onMounted, computed } from "vue"
import type { AudioSeries } from "../typing"
import { useRoute } from 'vue-router'
import AudioProgram from "./AudioProgram.vue";
import AudioIntroduction from "./AudioIntroduction.vue";
import AudioComment from "./AudioComment.vue";

const route = useRoute()
const audioActive = ref(1)
const id = route.query.Arera_id as unknown as number
const audioSeries = ref<AudioSeries>()

window.localStorage.setItem('articles', JSON.stringify([]))

const goBack = () => {
  window.history.go(-1)
}

const chose = computed(() => {
  if (audioActive.value == 1) {
    return AudioProgram;
  } else if (audioActive.value == 2) {
    return AudioIntroduction;
  } else {
    return AudioComment;
  }
})

onMounted(async () => {
  let { data } = await API.getAudioSeries(id)
  console.log(data);
  audioSeries.value = data.data[0]
  window.localStorage.setItem('articles', JSON.stringify(audioSeries.value))
})

</script>

<script lang="ts">
export default {
  name: "audioSeries",
};
</script>

<template>
  <div class="series">
    <van-loading v-if="!audioSeries" size="24px" vertical>加载中...</van-loading>
    <div v-if="audioSeries">
      <div class="head">
        <img src="../assets/img/P4.png" alt="返回" @click="goBack" />
        <p>{{ audioSeries.name }}</p>
      </div>
      <div class="series-photo">
        <img v-lazy="audioSeries.cover_url_chang" alt="series-img">
      </div>

      <div class="series-content">
        <div class="nav">
          <div class="nav-item">
            <div class="nav-list" :class="{ active: audioActive == 1 }" @click="audioActive = 1">
              节目
            </div>
            <div class="nav-list" :class="{ active: audioActive == 2 }" @click="audioActive = 2">
              简介
            </div>
            <div class="nav-list" :class="{ active: audioActive == 3 }" @click="audioActive = 3">
              评论
            </div>
          </div>
          <div v-if="audioActive == 1" class="count">共{{ audioSeries.audio_serie_count }}集</div>
        </div>

        <div class="series-list">
          <component :is="chose" :audioSeries="audioSeries.articles" :content="audioSeries.content" :seriesId="id" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.series {
  width: 100vw;
  height: 100px;

  .head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    top: 0;
    left: 0;
    padding: 10px 3vw;
    width: 100%;
    height: 40px;
    z-index: 999;
    background-color: #fff;

    img {
      width: 10px;
      height: 20px;
    }

    p {
      margin: auto;
    }
  }

  .series-photo {
    margin-bottom: 25px;
    border-radius: 10px;
    padding: 0 3vw;
    width: 100%;
    height: 25vh;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .series-content {
    padding: 0 3vw;

    .nav {
      display: flex;
      flex-direction: column;
      align-items: center;
      position: sticky;
      top: 40px;
      background-color: #fff;

      .nav-item {
        display: flex;
        justify-content: center;
        gap: 35px;

        .nav-list {
          padding: 10px 0;

          &.active {
            color: #0090f0;
            border-bottom: 1px solid #0090f0;
          }
        }

        .count {
          margin: auto;
        }
      }
    }
  }
}
</style>
