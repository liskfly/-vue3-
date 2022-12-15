<script setup lang="ts">
import { ref, onBeforeMount, watch, onMounted, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Api } from "@/apis";
import type { themeData } from "@/ReadPage";
import { Func } from "@/data/data";

const route = useRoute();
const router = useRouter();
const bookData = ref(<themeData>{});
const id: number = route.query.id as unknown as number;
const number = ref();
const isTrue = ref(false);
const top = ref();

const getDate = (date: string) => {
  return Func.getDate(date);
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

const getChoiceList = async (id: number) => {
  let { data } = await Api.getBookDataList("themes", id, ``);
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
});
</script>

<script lang="ts">
export default {
  name: "theme",
};
</script>

<template>
  <div>
    <div class="bookdata" v-if="bookData.name" :style="{ backgroundImage: `url(${bookData.cover_url})` }">
      <div class="top" :class="isTrue ? 'white' : ''">
        <div>
          <img class="backwhite" src="../assets/static/oK.png" v-show="!isTrue" @click="goBack">
          <img class="backblack" src="../assets/static/P4.png" v-show="isTrue" @click="goBack">
        </div>
        <span class="title">{{ bookData.name }}</span>
        <div></div>
      </div>
      <div class="background">
        <div class="shadow"></div>
        <div class="bottom" ref="number"></div>
      </div>
      <div class="data-top">
        <div class="cover">
          <img :src="bookData.cover_url">
        </div>
        <span class="title-two">{{ bookData.name }}</span>
        <div>
          <span class="grey">{{ getDate(bookData.display_time) }}</span>
          <span class="blue">单行本</span>
        </div>
        <div class="themes">
          <ul class="articles">
            <!-- <li v-for="{ title, id, display_time, read_time, word_times, cover_url, summary }
             in bookData.articles" :key="id" class="articles-list" @click="goToArticle(id)"> -->

            <li v-for="{ title, id, display_time, read_time, word_times, cover_url, summary }
             in bookData.articles" :key="id" class="articles-list" @click="gotoArticle(id)">
              <span class="title">{{ title }}</span>
              <span class="time">{{ getDate(display_time) + '·阅读时长' +
                  read_time + '分钟·' + word_times + '字'
              }}</span>
              <img v-lazy="cover_url">
              <div class="readers">
                <span class="summary">{{ summary }}</span>
                <div class="comment">
                  <span>{{ 1 }}</span>
                  <img src="../assets/static/gQ.png">
                  <span>{{ 2 }}</span>
                  <img src="../assets/static/Tc.png">
                </div>
              </div>
            </li>
          </ul>
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
    width: 100vw;
    padding: 15px 10px;
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

    img {
      width: 8px;
      height: 16px;
    }

    .title {
      width: 60vw;
      font-size: 20px;
      margin-right: 15px;
      text-align: center;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }

  .white {
    background-color: white;
    color: black;
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
    top: 0;
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

    .themes {
      box-sizing: border-box;
      width: 100vw;
      padding: 2vh 3vw 0 3vw;
      background-color: white;

      .articles {
        display: flex;
        flex-direction: column;

        .articles-list {
          padding: 2vh 0;
          display: flex;
          flex-direction: column;
          border-bottom: 1px solid rgb(232, 232, 232);

          .title {
            font-size: 16px;
            font-weight: 600;
            margin-bottom: 2vh;
          }

          .time {
            font-size: 12px;
            color: grey;
            margin-bottom: 2vh;
          }

          .readers {
            height: 2vh;
            color: grey;
            margin-top: 2vh;
            display: flex;
            font-size: 12px;
            justify-content: space-between;

            .summary {
              width: 60vw;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }

            .comment {
              display: flex;
              justify-content: center;

              span {
                margin-left: 4vw;
              }

              img {
                width: 4vw;
                height: 2vh;
                margin-left: 2vw;
              }
            }
          }
        }
      }
    }
  }
}
</style>