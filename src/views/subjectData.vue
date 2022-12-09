<script setup lang="ts">
import { ref, onBeforeMount, watch, onMounted, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Api } from "@/apis";
import type { Subject } from "@/ReadPage";
import { Func } from "@/data/data";

const route = useRoute();
const router = useRouter();
const bookData = ref(<Subject>{})
const id: number = route.query.id as unknown as number;
const number: any = ref();
const isTrue = ref(false);
const top: any = ref();
const loading = ref(false);

const getDate = (date: string) => {
  return Func.getDate(date);
};

const goBack = () => {
  router.go(-1);
};

const getMonthDay = (date: string) => {
  return Func.getMonthDay(date);
};

const getChoiceList = async (id: number) => {
  let { data } = await Api.getBookDataList("subjects", id, "");
  bookData.value = data.data;
  console.log(bookData.value);

};

const handleScrollx = () => {
  console.log(number.value);
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
        <div class="description">{{ bookData.description }}</div>
        <div class="comment">
          <div class="comment-list" v-for="{ id, introduction, avatar, name } in bookData.authors" :key="id">
            <div class="introduction">{{ introduction }}</div>
            <div class="avatar">
              <img :src="avatar">
              <span>{{ name }}</span>
            </div>
          </div>
        </div>
        <div style="{font-size: 24px;margin:10px 0;font-weight:700;}">最新文章</div>
        <div class="newest">
          <div v-for="(
          { id, title, summary, display_time, read_time }
        ) in bookData.articles" :key="id" class="newest-list">

            <!-- <div v-for="(
          { id, title, summary, display_time, read_time }
        ) in bookData.articles" :key="id" class="newest-list" @click="goToArticle(id)"> -->
            <span class="title">{{ title }}</span>
            <span class="summary">{{ summary }}</span>
            <span class="time">{{
                getMonthDay(display_time) + "·阅读时长" + read_time + "分钟"
            }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="loading" v-if="!bookData.name">
      <div class="loading-box">
        <van-loading color="#0094ff" size="50px" />
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
      font-size: 20px;
      margin-right: 20px;
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

    .newest {
      box-sizing: border-box;
      padding: 0 10px;
      margin-top: 2vh;

      .newest-list {
        padding-top: 2vh;
        display: flex;
        flex-direction: column;

        span {
          padding-bottom: 2vh;
        }

        .title {
          font-size: 16px;
          font-weight: 700;
        }

        .summary {
          font-size: 14px;
          color: grey;
        }

        .time {
          font-size: 12px;
          color: grey;
          border-bottom: 1px solid rgb(232, 232, 232);
        }
      }
    }

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
      font-size: 20px;
      margin: 10px 0;
      font-weight: 700;
    }
  }

  .description {
    box-sizing: border-box;
    width: 100vw;
    padding: 10px;
    font-size: 14px;
    color: rgb(164, 164, 164);
  }

  .comment {
    width: 100vw;
    height: 123px;
    display: flex;
    overflow: auto;

    &::-webkit-scrollbar {
      display: none;
    }

    .comment-list {
      width: 40vw;
      height: 100px;
      margin: 0 10px;
      padding: 10px;
      box-shadow: 0px 0px 5px #c6c6c6;
      position: relative;

      .introduction {
        width: 40vw;
        font-size: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
      }

      .avatar {
        position: absolute;
        left: 10px;
        bottom: 10px;
        display: flex;

        img {
          width: 30px;
          height: 30px;
          border-radius: 999px;
          margin-right: 2vw;
        }
      }
    }
  }
}

.loading {
  width: 100vw;
  height: 100vh;
  display: flex;

  .loading-box {
    margin: auto;
  }
}
</style>

<style>
/* .introduction {
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
} */
</style>