<script setup lang="ts">
import { API } from "../apis/getData"
import { ref, onMounted, nextTick } from "vue"
import type { BannersType, Area, Popular } from "../typing"
import { useRouter } from 'vue-router'

const banners = ref<BannersType[]>([])
const areas = ref<Area[]>([])
const populars = ref<Popular[]>([])

const audioTime = (num: number) => {
    let min: any = num / 60
    min = min > 10 ? parseInt(min) : "0" + parseInt(min);
    let sec: any = num % 60;
    sec = sec > 10 ? sec : "0" + sec;
    return min + ":" + sec;
}

const router = useRouter()
// 跳转音频详情
const goToAudioDetail = (id: number) => {
    router.push({
        path: '/audio-detail',
        query: {
            detail_id: id
        }
    })
}

onMounted(async () => {
    let { data } = await API.getAudioBanner()
    //   console.log(data);
    banners.value = data.data

    let areaData = await API.getArea()
    // console.log(areaData);
    areas.value = areaData.data.data

    let popularData = await API.getPopular()
    // console.log(popularData);
    populars.value = popularData.data.data

})
</script>

<template>

    <div class="audio">
        <div class="Headlines">
            <span>听</span>
            <img src="../assets/img/Yg.png" @click="">
        </div>

        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
            <van-swipe-item v-for="item in banners" :key="item.bannerable_id"><img :src="item.cover_url" alt="banner">
            </van-swipe-item>
        </van-swipe>

        <div class="area">
            <h2>精品专区</h2>
            <span class="text">大家都在听</span>
            <div class="list">
                <div class="box" v-for="t in areas" :key="t.id" @click="">
                    <div class="area-img">
                        <img v-lazy="t.cover_url" />
                        <div class="visit_times"><i></i> <span>{{ t.visit_times }}</span></div>
                    </div>
                    <div class="area-text">
                        <p>{{ t.name }}</p>
                        <span>{{ t.summary }}</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="popular">
            <h2>热门推荐</h2>
            <span class="text">最高人气·最热点播</span>
            <div class="box" v-for="p in populars" :key="p.id" @click="goToAudioDetail(p.id)">
                <div class="box-left">
                    <img v-lazy="p.cover_url" class="lazyload-img" />
                </div>
                <div class="box-right">
                    <div class="box-text">
                        <p class="title">{{ p.title }}</p>
                        <p class="summary">{{ p.summary }}</p>
                    </div>
                    <div class="visit_times">
                        <div class="visit">
                            <i></i>
                            <span>{{ p.visit_times }}</span>
                        </div>
                        <div class="times">
                            <i></i>
                            <span>{{ audioTime(p.audio_duration) }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- <HomeHead v-show="$route.meta.showfater" :banner="banner"></HomeHead>
        <van-popup v-model="showSearch" position="right" :style="{ height: '100%' }">
            <SearchBar @show-search="goBackAudio" />
        </van-popup>
        <BoutiqueArea v-show="$route.meta.showfater" :area="area"></BoutiqueArea>
        <PopularRed v-show="$route.meta.showfater" :popular="popular"></PopularRed> -->
    </div>


    <van-tabbar route>
        <van-tabbar-item replace to="/" icon="home-o">首页</van-tabbar-item>
        <van-tabbar-item replace to="/audio" icon="music-o">音频</van-tabbar-item>
        <van-tabbar-item replace to="/read" icon="new-o">阅读</van-tabbar-item>
        <van-tabbar-item replace to="/user" icon="user-circle-o">我的</van-tabbar-item>
    </van-tabbar>
</template>

<style lang="scss" scoped>
.audio {
    margin-bottom: 65px;
    overflow: visible;

    .Headlines {
        display: flex;
        align-items: center;
        justify-content: center;
        position: fixed;
        width: 100vw;
        padding: 10px 15px;
        font-family: "穿越寒冬拥抱你";
        font-size: 20px;
        font-weight: 900;
        top: 0;
        z-index: 999;
        background-color: white;

        img {
            position: absolute;
            right: 15px;
            width: 18px;
            height: 18px;
        }
    }

    .my-swipe {
        width: 100vw;
        margin-top: 5vh;

        img {
            margin: 2vh auto 0;
            display: block;
            border-radius: 2vw;
            width: 94%;
            // box-shadow: 0px -5px 10px 0px #ff0000,
            //   -6px 0px 6px 0px #3bee17,
            //   6px 0px 6px 0px #2279ee,
            //   0px 5px 19px 0px #eede15;
        }
    }

    .area {
        padding: 20px 3vw;

        h2 {
            font-size: 18px;
            font-weight: bold;
        }

        .text {
            font-size: 12px;
            color: #888;
        }

        .list {
            display: flex;
            gap: 10px;
            overflow: auto;

            &::-webkit-scrollbar {
                display: none;
            }

            .box {
                flex: 0 0 31%;

                .area-img {
                    position: relative;
                    margin: 10px 0;
                    width: 100%;
                    height: 30vw;

                    img {
                        width: 100%;
                    }

                    .visit_times {
                        display: flex;
                        align-items: center;
                        border-radius: 999px;
                        position: absolute;
                        left: 8px;
                        bottom: 10px;
                        width: 62px;
                        height: 18px;
                        font-size: 12px;
                        line-height: 18px;
                        color: #fff;
                        background-color: rgba(0, 0, 0, .6);

                        i {
                            display: inline-block;
                            margin: auto 6px;
                            width: 10px;
                            height: 12px;
                            background-image: url(../assets/img/Jf.png);
                            background-repeat: no-repeat;
                            background-size: 100% 100%;
                        }
                    }
                }

                .area-text {
                    display: flex;
                    flex-direction: column;
                    width: 30vw;

                    p {
                        font-size: 14px;
                        font-weight: bold;
                        line-height: 20px;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        overflow: hidden;
                    }

                    span {
                        flex: 0 30vw auto;
                        display: inline-block;
                        width: 100%;
                        font-size: 12px;
                        line-height: 16px;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        color: #888;
                    }
                }
            }
        }
    }

    .popular {
        padding: 0 3vw;

        h2 {
            font-size: 18px;
            margin-bottom: 5px;
            font-weight: bold;
        }

        .text {
            font-size: 12px;
            color: #888;
        }

        .box {
            padding: 15px 0;
            border-bottom: 1px solid #eee;
            width: 100%;
            height: 100px;
            overflow: hidden;

            .box-left {
                float: left;
                margin-right: 4vw;
                width: 70px;
                height: 70px;

                img {
                    width: 100%;
                }
            }

            .box-right {
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: space-between;

                .box-text {
                    width: 100%;

                    P {
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        overflow: hidden;
                    }

                    .title {
                        font-size: 16px;
                        font-weight: bold;
                    }

                    .summary {
                        margin-top: 5px;
                        font-size: 13px;
                        color: #888;
                    }
                }
            }

            .visit_times {
                display: flex;
                gap: 15px;

                i {
                    display: inline-block;
                    margin-right: 5px;
                    width: 12px;
                    height: 12px;
                }

                span {
                    font-size: 12px;
                    color: #888;
                }

                .visit {
                    display: flex;
                    align-items: center;

                    i {
                        background: url(../assets/img/iQ.png) no-repeat;
                        background-size: 100% 100%;
                    }
                }

                .times {
                    display: flex;
                    align-items: center;

                    i {
                        background: url(../assets/img/sH.png) no-repeat;
                        background-size: 100% 100%;
                    }
                }
            }
        }
    }
}
</style>