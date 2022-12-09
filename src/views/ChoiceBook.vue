<script setup lang="ts">
import { ref, onBeforeMount, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Api } from "@/apis";
import type { bannerData } from "@/ReadPage";
import { Func } from "@/data/data";

const route = useRoute();
const router = useRouter();
const loading = ref(false);
const bookList = ref<bannerData[]>([]);
const bookType: string = route.query.type as string;
const bookYear: number | null = route.query.year as number | null;
const bookMonth: number | null = route.query.month as number | null;
const getDate = (date: string) => {
  return Func.getDate(date);
};
// const getDate:string = Func.getDate()

const getChoiceList = async () => {
  let { data } = await Api.getChoiceList(bookType, bookYear, bookMonth);
  if (data.data[0]) {
    bookList.value = data.data[0].data;
  } else {
    bookList.value = [];
  }
  loading.value = true;
  console.log(bookList.value);
};

const goBack = () => {
  router.go(-1);
};

const goBookData = (id: number, type: string) => {
  if ((type == "Magazine")) {
    router.push({
      path: "/magazinedata",
      query: {
        id,
      },
    });
  } else if ((type == "Subject")) {
    router.push({
      path: "/subjectdata",
      query: {
        id,
      },
    });
  } else if ((type == "Theme")) {
    router.push({
      path: "/themedata",
      query: {
        id,
      },
    });
  }
};

onBeforeMount(() => {
  getChoiceList();
});
</script>

<script lang="ts">
export default {
  name: "choice",
};
</script>

<template>
  <div class="choiceBook">
    <div class="top">
      <img src="../assets/static/P4.png" @click="goBack">
      <div class="type">书本</div>
      <div></div>
    </div>
    <ul class="book" v-if="bookList[0] && loading">
      <li v-for="({cover_url,summary,display_time,id,name,type},index) in bookList" :key="index"
        @click="goBookData(id,type)">
        <img :src="cover_url">
        <span class="summary">{{summary || name}}</span>
        <span class="time">{{getDate(display_time)}}</span>
      </li>
    </ul>
    <div v-if="!bookList[0] && loading" class="book">
      <img class="nobook" src="../assets/static/3T.png">
      <span class="nobook">这期没书哦</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.choiceBook {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;

  .top {
    display: flex;
    margin: 20px 0 0 4vw;
    align-items: center;

    .type {
      position: relative;
    }

    img {
      width: 9px;
      height: 18px;
    }

    .type {
      font-size: 18px;
      margin: auto;
    }
  }

  .book {
    box-sizing: border-box;
    width: 100vw;
    margin-top: 3vh;
    padding: 0 2vw 0 2vw;
    display: flex;
    flex-wrap: wrap;

    li {
      width: 30vw;
      display: flex;
      flex-direction: column;
      margin: 0 1vw 30px;
      align-items: center;
      img {
        width: 30vw;
      }

      .summary {
        width: 28vw;
        white-space: nowrap;
        text-align: center;
        text-overflow: ellipsis;
        overflow: hidden;
        margin-top: 2vh;
      }

      .time {
        font-size: 12px;
        margin-top: 1vh;
      }

    }

    .nobook {
      width: 100vw;
      text-align: center;
    }
  }
}
</style>