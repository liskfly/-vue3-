<script setup lang="ts">
import { ref, onMounted, watch } from "vue"
import type { AudioDetail } from "../typing"
import { useRoute, useRouter } from 'vue-router';
import { API } from "../apis/getData"
import { getDate, getIcon } from '../utils/index'
import { storeToRefs } from 'pinia'
import { audioplay } from '@/stores/audioplay'
import AudioPlay from '../components/AudioPlay.vue'

const store = audioplay()
const audio = ref()
const { cur, progress, playAudio } = storeToRefs(store)
const { getCurr, getTotalTime, changeStatus } = store
const route = useRoute();
const router = useRouter();
// const id: any = route.query.detail_id;
const id: any = ref(route.query.detail_id)
const detail = ref<AudioDetail>()
const showPlay = ref(false)


const hideAudioPlay = (val: any) => {
    showPlay.value = val.content
}

const changeAudioId = (val: any) => {
    console.log(val.audioid);
    id.value = val.audioid
}

const goBack = () => {
    window.history.go(-1)
}

const goToAudioPlay = () => {
    showPlay.value = true
}

const stopAudio = () => {
    changeStatus()

}

const getCurrentTime = () => {
    let time: number = audio.value?.currentTime
    getCurr(time)
}

onMounted(async () => {
    let { data } = await API.getAudioData(id.value)
    console.log(data);
    detail.value = data.data
    playAudio.value = true
    getTotalTime(detail.value?.audio_duration)
})

watch(id, async (newV, oldV) => {
    console.log(newV, oldV);
    let { data } = await API.getAudioData(newV)
    console.log(data);
    detail.value = data.data
    progress.value = 0
    playAudio.value = true
    getTotalTime(detail.value?.audio_duration)
})

watch(cur, (time) => {
    audio.value.currentTime = time
})

watch(playAudio, (bool) => {
    if (bool) {
        audio.value.play()
    } else {
        audio.value.pause()
    }
})

</script>

<script lang="ts">
export default {
    name: "audioDetail",
};
</script>


<template>
    <van-loading style="margin-top: 10vh;" v-if="!detail" size="24px" vertical>加载中...</van-loading>
    <!-- <div style="margin-top: 10vh;">{{ audioData }}</div> -->
    <div v-if="detail" class="audiodetail">
        <div class="header">
            <img src="../assets/img/P4.png" alt="返回" class="back" @click="goBack" />
            <span>{{ detail.audio_title }}</span>
            <img src="../assets/img/OE.png" alt="更多" class="gd" />
        </div>

        <div class="detail">
            <!-- <van-loading color="#1989fa" v-show="pageLoading" /> -->
            <div class="detail-title">
                <p>{{ detail.title }}</p>
                <span v-if="detail.display_time">{{ getDate(detail.display_time) }}</span>
            </div>
            <div class="detail-audio"></div>
            <div class="detail-text" v-html="detail.content"></div>
            <div class="text-bottom">
                <div class="text-ascription">
                    <span>本文版权归本人开发者所有</span>
                    <span>未经许可不得转载或翻译</span>
                </div>
                <div class="article-like">
                    <div class="like-icon">
                        <i class="collect"></i>
                        <div class="fond"><img src="../assets/img/_m.png" alt="" /></div>
                        <i class="share"></i>
                    </div>
                    <span>{{ detail.favorite_times }}</span>
                </div>
            </div>
        </div>

        <div class="audio-box" v-show="detail.audio_url" @click="goToAudioPlay">
            <audio :src="detail.audio_url" ref="audio" @timeupdate="getCurrentTime" autoplay></audio>
            <!-- <img src="@/assets/img/Zg.png" alt="sh" @click.stop="clearAudio" /> -->
            <p>{{ detail.title }}</p>
            <i></i>
            <div class="control" :class="{ showbox: playAudio }" @click.stop="stopAudio"></div>
        </div>

        <van-popup v-model:show="showPlay" position="bottom" :style="{ height: '100%' }">
            <!-- <AudioPlay @sent-appId="sentAudioId" @sent-play="sentPlay" @set-audioTime="setAudioTime"
                @hide-play="hidePlay" @set-speed="setSpeed" :playAudio="playAudio" :curr="curr" :speed="speed"
                :audioCon="audioCon" :audioArr="audioArr" /> -->
            <AudioPlay @hide="hideAudioPlay" @audioid="changeAudioId" :detail="detail"></AudioPlay>
        </van-popup>

        <!-- <div class="detail-bottom">
            <ArticleFooter :article="detail" />
        </div> -->
    </div>
</template>

<style lang="scss" scoped>
.audiodetail {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    overflow: auto;

    // background-color: #fff;
    // z-index: 2019;
    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: sticky;
        top: 0;
        left: 0;
        padding: 10px 3vw;
        width: 100%;
        height: 40px;
        background-color: #fff;

        .back {
            width: 10px;
            height: 20px;
        }

        .gd {
            width: 35px;
            height: 35px;
        }
    }

    .detail {
        padding: 15px 3vw 45px 3vw;

        .detail-title {
            margin-bottom: 10px;

            p {
                font-size: 18px;
                line-height: 24px;
                font-weight: bold;
            }

            span {
                color: #888;
                font-size: 13px;
            }
        }

        .detail-text {
            p {
                font-size: 16px;
                margin-bottom: 15px;
                line-height: 25px;

                span {
                    strong {
                        font-size: 14px;
                    }
                }

                strong {
                    font-weight: bold;
                }
            }
        }

        .text-bottom {
            margin: 25px 0;

            .text-ascription {
                display: flex;
                flex-direction: column;
                align-items: flex-end;

                span {
                    font-size: 13px;
                    line-height: 18px;
                    color: #888;
                }
            }

            .article-like {
                margin-top: 20px;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 10px;

                // justify-content: center;
                // gap: 20px;
                .like-icon {
                    display: flex;
                    gap: 20px;
                    align-items: flex-end;

                    i {
                        width: 24px;
                        height: 23px;
                    }

                    .fond {
                        border-radius: 999px;
                        width: 50px;
                        height: 50px;
                        overflow: hidden;

                        img {
                            width: 100%;
                        }
                    }

                    .collect {
                        background-image: url(@/assets/img/Ip1.png);
                        background-repeat: no-repeat;
                        background-size: 100% 100%;
                    }

                    .share {
                        background-image: url(@/assets/img/T5.png);
                        background-repeat: no-repeat;
                        background-size: 100% 100%;
                    }
                }

                span {
                    font-size: 13px;
                    color: #888;
                }
            }
        }
    }

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
}
</style>