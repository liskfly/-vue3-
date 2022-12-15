<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { audioplay } from "@/stores/audioplay"
import { defineEmits, defineProps, toRefs, ref, watch } from 'vue';
import { useRouter } from 'vue-router'

const store = audioplay();
const { audioData } = storeToRefs(store)
const { cur, progress, playAudio } = storeToRefs(store)
const { changeLong, changeStatus } = store
const emit = defineEmits(['hide', 'audioid'])
const props = defineProps({
  detail: Object
});
const { detail } = toRefs(props)
const showAllAudio = ref(false)
const router = useRouter();
const runAnim = ref();

const hide = () => {
  let param = {
    content: false
  }
  emit('hide', param)
}

const getTime = (a: number) => {
  let min: any = parseInt((a / 60).toString());
  min = min > 9 ? min : "0" + min;
  let sec: any = a % 60;
  sec = sec > 9 ? sec : "0" + sec;
  return min + ":" + sec;
}

const chooseAudio = (id: number) => {
  let param = {
    audioid: id
  }
  emit('audioid', param)
  showAllAudio.value = !showAllAudio.value
}

const activeAudio = (id: any) => {
  let a = audioData.value.articles.findIndex((t: any) => t.id == id);
  return a;
}

const preAudio = (id: any) => {
  console.log(id);

  let a = audioData.value.articles.findIndex((t: any) => t.id == id);
  if (a == 0) {
    alert("这是第一个Audio");
  } else {
    let preId = audioData.value.articles[a - 1].id;
    // console.log(preId);
    let param = {
      audioid: preId
    }
    emit('audioid', param)

  }
}

const nextAudio = (id: any) => {
  let a = audioData.value.articles.findIndex((t: any) => t.id == id);
  if (a == audioData.value.articles.length - 1) {
    alert("这是最后一个Audio");
  } else {
    let preId = audioData.value.articles[a + 1].id;
    let param = {
      audioid: preId
    }
    emit('audioid', param)
  }
}

const stopAudio = () => {
  changeStatus()

}

watch(playAudio, (bool) => {
  if (bool) {
    runAnim.value.style.animationPlayState = "running";
  } else {
    runAnim.value.style.animationPlayState = "paused";
  }
})

</script>

<template>
  <div class="audio-play" v-if="detail">
    <div class="bg" :style="{ backgroundImage: 'url(' + audioData.cover_url + ')' }">
      <div class="audio-box">

        <div class="head">
          <img src="@/assets/img/KB.png" alt="goback" @click="hide" />
          <img src="@/assets/img/35.png" alt="share" @click.stop="" />
        </div>

        <!-- 分享 -->
        <!-- <van-share-sheet v-model="showShare" title="立即分享给好友" :options="shareOptions" @select="onSelect" /> -->

        <div class="audio-title">
          <p>{{ detail.title }}</p>
        </div>

        <div class="audio-anime">
          <div class="run" ref="runAnim">
            <img :src="audioData.cover_url" alt="tp" />
          </div>
        </div>

        <div class="download-speed">
          <img src="@/assets/img/Cf.png" alt="download" />
          <!-- <img src="@/assets/img/pz.png" alt="speed" @click="showSpeed = !showSpeed" /> -->
          <img src="@/assets/img/pz.png" alt="speed" />
          <!-- <van-popup v-model="showSpeed" position="bottom" closeable round :style="{ height: '30%' }">
            <div class="speed-box">
              <div v-for="s in speedArr" :key="s.value" :class="{ speedc: speed == s.value }"
                @click="chooseSpeed(s.value)">
                {{ s.text }}
              </div>
            </div>
          </van-popup> -->

          <!-- <div class="speed-count">{{ speed + "x" }}</div> -->
          <div class="speed-count">{{ 1 + "x" }}</div>
        </div>

        <div class="control">
          <van-slider v-model="progress" bar-height="2px" active-color="#fff" @change="changeLong">
            <template #button>
              <div class="custom-button"></div>
            </template>
          </van-slider>

          <div class="audio-text-time">
            <span>{{ getTime(cur) }}</span>
            <span>{{ getTime(detail.audio_duration) }}</span>
          </div>

          <div class="audio-control">
            <img src="@/assets/img/eF.png" alt="dd" @click="showAllAudio = !showAllAudio" />

            <van-popup v-model:show="showAllAudio" position="bottom" :style="{ height: '50%' }">
              <div class="progm">
                <div class="progm-top">
                  <p>节目</p>
                  <img src="@/assets/img/UR.png" alt="x" @click.stop="showAllAudio = false" />
                </div>
                <span>共{{ audioData.audio_serie_count }}集</span>
              </div>

              <div class="progm-box" v-if="audioData">
                <div class="audio-item" v-for="(a, i) in audioData.articles" :key="a.title" @click="chooseAudio(a.id)">
                  <span :class="{ play: activeAudio(detail.id) == i }">{{
                      i >= 9 ? i + 1 : "0" + (i + 1)
                  }}</span>
                  <p :class="{ play: activeAudio(detail.id) == i }">
                    {{ a.title }}
                  </p>
                  <span class="audio-time"><i></i>{{ getTime(a.audio_duration) }}</span>
                </div>
              </div>
            </van-popup>

            <img src="@/assets/img/hA.png" alt="dd" @click.stop="preAudio(detail?.id)" />
            <div class="audio-play-control" :class="{ play: playAudio }" @click.stop="stopAudio"></div>
            <img src="@/assets/img/rY.png" alt="dd" @click="nextAudio(detail?.id)" />
            <img src="@/assets/img/Wl.png" alt="xs" @click="hide" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.audio-play {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 120;
  width: 100vw;
  height: 100vh;

  .bg {
    width: 100%;
    height: 100%;
    position: relative;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

    .audio-box {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: absolute;
      padding: 0 3vw;
      width: 100%;
      height: 100%;
      backdrop-filter: blur(8px);
      background-color: rgba(0, 0, 0, 0.3);

      .head {
        display: flex;
        justify-content: space-between;
        padding: 15px 0;
        width: 100%;
        height: 48px;

        img {
          width: 18px;
          height: 18px;
        }
      }

      .audio-title {
        display: flex;
        font-size: 18px;
        font-weight: bold;
        color: #fff;

        p {
          margin: auto;
          line-height: 20px;
        }
      }

      .audio-anime {
        display: flex;
        width: 100%;
        height: 55vh;

        .run {
          margin: auto;
          border-radius: 999px;
          width: 50vw;
          height: 50vw;
          overflow: hidden;
          animation: turnAnimate 20s linear infinite;

          img {
            width: 100%;
          }
        }
      }

      .download-speed {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 60px;

        img {
          width: 24px;
          height: 20px;
        }

        .speed-box {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 15px;
          margin-top: 52px;
        }

        .speedc {
          color: #0090ff;
          font-weight: bold;
        }

        .speed-count {
          position: absolute;
          top: -4px;
          left: 220px;
          padding: 1px;
          border-radius: 999px;
          color: #fff;
          font-size: 12px;
          font-weight: bold;
          line-height: 14px;
          background-color: red;
        }
      }

      .control {
        padding: 30px 0;

        .custom-button {
          border-radius: 999px;
          width: 10px;
          height: 10px;
          background-color: #fff;
        }

        .audio-text-time {
          margin-top: 10px;
          display: flex;
          justify-content: space-between;
          color: #eee;
          font-size: 12px;
        }

        .audio-control {
          margin-top: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          height: 60px;

          .audio-play-control {
            width: 45px;
            height: 45px;
            background-image: url(@/assets/img/EU.png);
            background-size: 100% 100%;
            background-repeat: no-repeat;
          }

          .play {
            background-image: url(@/assets/img/RI.png);
          }

          img {
            width: 22px;
            height: 22px;
          }

          .progm {
            display: flex;
            flex-direction: column;
            align-items: center;
            position: sticky;
            top: 0;
            left: 0;
            padding: 0 4vw;
            background-color: #fff;

            .progm-top {
              width: 100%;

              display: flex;
              justify-content: flex-end;
              padding-top: 10px;

              img {
                width: 16px;
                height: 16px;
              }

              p {
                margin: auto;
              }
            }

            p {
              font-size: 16px;
            }

            span {
              margin: 7px 0;
              font-size: 13px;
              color: #888;
            }
          }

          .progm-box {
            padding: 0 4vw;

            .audio-item {
              display: flex;
              gap: 10px;
              align-items: flex-start;
              padding: 8px 0;
              font-size: 13px;
              border-bottom: 1px solid #eee;

              span {
                color: #888;
              }

              P {
                flex: 1;
              }

              .play {
                color: #0090ff;
              }

              .audio-time {
                display: flex;
                align-items: center;
                font-size: 12px;

                i {
                  display: inline-block;
                  margin-right: 10px;
                  width: 12px;
                  height: 12px;
                  background-image: url(@/assets/img/sH.png);
                  background-repeat: no-repeat;
                  background-size: 100% 100%;
                }
              }
            }
          }
        }
      }
    }
  }

  .move-enter {
    transform: translateY(100%);
  }

  .move-leave-to {
    transform: translateY(-100%);
  }

  .move-enter-active,
  .move-leave-active {
    transition: all 10s linear;
  }

  .move-leave,
  .move-enter-to {
    transform: translateY(0);
  }
}

@keyframes turnAnimate {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>