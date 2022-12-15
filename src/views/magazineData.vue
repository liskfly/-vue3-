<script setup lang="ts">
import { ref, onBeforeMount, watch, onMounted, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Api } from "@/apis";
import type { magazineData } from "@/ReadPage";
import { storeToRefs } from "pinia";
import { deconstruction } from "@/stores/counter";

const route = useRoute();
const router = useRouter();
const bookData = ref<magazineData[]>([]);
const stow = ref([false, false, false, false, false]);
const id: number = route.query.id as unknown as number;
const article = ref();
const number: any = ref();
const isTrue = ref(false);
const top: any = ref();
const loading = ref(false);
const show = ref(true);
const store = deconstruction();
const { locatSubscribe } = storeToRefs(store);
const { saveSubscribe } = store;

const getChoiceList = async (id: number) => {
  let { data } = await Api.getBookDataList("magazines", id, "/articles");
  bookData.value = data.data;
};

const handleScrollx = () => {
  top.value = number.value.getBoundingClientRect().top;
  if (top.value < 35) {
    isTrue.value = true;
  } else {
    isTrue.value = false;
  }
};

const isSubscribe = () => {
  show.value = !show.value;
  saveSubscribe(
    id,
    "magazines",
    bookData.value[0].magazine_cover_url,
    bookData.value[0].magazine_summary
  );
};

const isstow = (index: number) => {
  stow.value[index] = !stow.value[index];
};

const goBack = () => {
  router.go(-1);
};

const gotoArticle = (id: number) => {
  router.push({
    path: '/article',
    query: {
      article_id: id
    }
  })
}

onMounted(() => {
  window.addEventListener("scroll", handleScrollx, true);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScrollx, true);
});

watch(
  () => top.value,
  (pev, old) => {
    window.addEventListener("scroll", handleScrollx, true);
  }
);

onBeforeMount(() => {
  getChoiceList(id);
  show.value =
    locatSubscribe.value.findIndex((item) => item.id == id) == -1
      ? true
      : false;
});
</script>

<script lang="ts">
export default {
  name: "magazine",
};
</script>

<template>
  <div>
    <div class="bookdata" v-if="bookData[0]" :style="{ backgroundImage: `url(${bookData[0].magazine_cover_url})` }">
      <div class="top" :class="isTrue ? 'white' : ''">
        <div>
          <img class="backwhite" src="../assets/static/oK.png" v-show="!isTrue" @click="goBack">
          <img class="backblack" src="../assets/static/P4.png" v-show="isTrue" @click="goBack">
        </div>
        <span class="title">{{ bookData[0].magazine_summary }}</span>
        <div></div>
      </div>
      <div class="background">
        <div class="shadow"></div>
        <div class="bottom" ref="number"></div>
      </div>
      <div class="data-top">
        <div class="cover">
          <img :src="bookData[0].magazine_cover_url">
        </div>
        <span class="title-two">{{ bookData[0].magazine_summary }}</span>
        <div>
          <span class="grey">{{ bookData[0].magazine_name }}</span>
          <span class="blue">NO.{{ bookData[0].magazine_all_number }}</span>
        </div>
        <div @click="isSubscribe" v-show="show">
          <van-button class="subscribe" style="height:30px;width:130px;" round type="primary">
            订阅
          </van-button>
        </div>
        <div @click="isSubscribe" v-show="!show">
          <van-button class="subscribe" style="height:30px;width:130px;" round>
            已订阅
          </van-button>
        </div>
        <div class="bookContent">
          <div v-for="(
        { column_icon, column_id, column_summary, articles }, index
      ) in bookData" :key="column_id" class="differentMagazines"
            :style="{ flexDirection: index % 2 != 0 ? 'row-reverse' : 'row' }">
            <div :style="{ flexDirection: index < 2 ? 'row' : 'row-reverse' }" class="flex">
              <img :src="column_icon" class="img" />
              <div ref="article" class="article" :style="{
                backgroundColor: index % 2 == 0 ? '#d8eeff' : '#fff',
                height: stow[index] ? `calc(23vw + ${articles.length * 41 + 50}px)` : '23vw',
              }">
                <div :class="stow[index] ? 'summaryshow' : 'summary'">
                  {{ column_summary }}
                </div>
                <div style="color: grey" v-show="stow[index]">
                  共{{ articles.length }}篇文章
                </div>
                <!-- <div v-for="{ id, title } in articles" :key="id" class="articles" v-show="stow[index]"
                  @click="goToArticle(id)"> -->

                <div v-for="{ id, title } in articles" :key="id" class="articles" v-show="stow[index]"  @click="gotoArticle(id)">
                  {{ title }}
                </div>
                <div class="stow" v-show="stow[index]" @click="isstow(index)">
                  <img src="../assets/static/Nn.png" />
                  <span>点击收起</span>
                </div>
                <div class="stow-false" v-show="!stow[index]" @click="isstow(index)">
                  查看更多
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bookdata {
  width: 100vw;
  height: 100vh;
  position: relative;
  background-size: 100% 100%;

  .top {
    box-sizing: border-box;
    width: 100vw;
    padding: 10px;
    position: fixed;
    top: 0;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: white;

    .backwhite {
      width: 20px;
      height: 10px;
      transform: rotate(270deg);
    }

    .backblack {
      width: 10px;
      height: 20px;
    }

    .title {
      width: 60vw;
      text-align: center;
      font-size: 20px;
      margin-right: 30px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }

  .white {
    background-color: white;
    color: #000;
  }

  .background {
    width: 100vw;
    position: absolute;
    top: 0;
    z-index: 0;

    .shadow {
      width: 100vw;
      height: 28vh;
      backdrop-filter: blur(5px);
      background-color: rgba(0, 0, 0, 0.2);
    }

    .bottom {
      width: 100vw;
      height: 72vh;
      background-color: white;
    }
  }

  .data-top {
    width: 100vw;
    margin-top: 50px;
    position: absolute;
    display: flex;
    z-index: 1;
    flex-direction: column;
    align-items: center;

    .cover {
      position: relative;

      img {
        width: 45vw;
      }
    }

    .cover::after {
      content: "";
      width: 100%;
      position: absolute;
      height: 98%;
      top: 0;
      left: 0;
      background-image: url(../assets/static/4w.png);
    }

    .blue {
      color: dodgerblue;
    }

    .grey {
      color: grey;
      margin-right: 3vw;
    }

    .title-two {
      width: 80vw;
      font-size: 20px;
      margin: 10px 0;
      font-weight: 700;
      text-align: center;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .subscribe {
      margin-top: 10px;
    }

    .bookContent {
      width: 100vw;
      background-color: white;
      margin-top: 2vh;
      margin-bottom: 2vh;

      .flex {
        display: flex;
        min-width: 0;
      }

      .differentMagazines {
        box-sizing: border-box;
        width: 100vw;
        display: flex;
        padding: 0 4vw;

        .img {
          width: 23vw;
          height: 23vw;
        }

        .article {
          box-sizing: border-box;
          width: 46vw;
          border: 1px solid #eeeeee;
          position: relative;
          transition: all ease-in-out 0.7s;
          overflow: hidden;

          .stow-false {
            position: absolute;
            right: 2vw;
            bottom: 0;
            color: #3893ff;
          }

          .summary {
            height: 12vw;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
          }

          .summaryshow {
            box-sizing: border-box;
            height: 23vw;
            line-height: 20px;
            text-overflow: ellipsis;
            overflow: hidden;
            /*!autoprefixer:off*/
            -webkit-box-orient: vertical;
            /*autoprefixer:on*/
            display: -webkit-box;
            -webkit-line-clamp: 4;
          }

          div {
            box-sizing: border-box;
            padding: 10px;
            font-size: 12px;
          }

          .articles {
            width: 90%;
            font-size: 15px;
            border-bottom: 1px solid #b0cade;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
          }

          .stow {
            box-sizing: border-box;
            margin: 0;
            padding: 10px;
            width: 100%;
            display: flex;
            flex-direction: row-reverse;
            align-items: center;
            color: #3893ff;

            img {
              width: 12px;
              height: 5px;
              margin-left: 5px;
            }
          }
        }
      }
    }
  }
}
</style>