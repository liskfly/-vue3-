<script setup lang="ts">
import { ref, onMounted, nextTick, onBeforeMount, onActivated } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Api } from "@/apis";
import type { banner, bannerType } from "@/ReadPage";
import ReadList from "./ReadList.vue";
import { Func } from "@/data/data";
import PopupLeft from "./PopupLeft.vue";

const route = useRoute();
const router = useRouter();
const tab = ref([
  { name: "全部", url: "magazines?year=2022", type: "" },
  { name: "杂志", url: "magazines?year=2022&type=magazine", type: "magazine" },
  { name: "单行本", url: "magazines?year=2022&type=subject", type: "subject" },
]);
const readBanner = ref<bannerType[]>([]);
const readType = ref("");
const show = ref(false);

const getDate = (date: string) => {
  return Func.getDate(date);
};

//点击切换阅读类型
const onClickTab = (item: any) => {
  readType.value = tab.value[item.name].type;
  // getReadListFunc(year.value,tab.value[name].type)
  getBannerFunc(tab.value[item.name].url);
  console.log(name);

};

//请求阅读页轮播
const getBannerFunc = async (url: string) => {
  let { data } = await Api.getReadBanner(url);
  readBanner.value = data.data;
};

//展示弹出层
const showPopup = () => {
  console.log(1);
  show.value = true;
};

const isShow = () => {
  show.value = false;
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
  getBannerFunc("magazines?year=2022");
});
</script>

<template>
  <div class="readpage">
    <van-tabs @click-tab="onClickTab" sticky>
      <template v-slot:nav-right>
        <img src="../assets/static/Dh.png" :style="{ width: '25px', height: '20px', margin: '12px 7px' }" />
      </template>
      <template v-slot:nav-left>
        <img @click="showPopup" src="../assets/static/3H.png"
          :style="{ width: '20px', height: '20px', margin: '12px 7px' }" />
      </template>
      <van-tab v-for="(item, index) in tab" :title="item.name" :name="index" :key="index">
        <van-swipe :autoplay="3000" :show-indicators="false">
          <van-swipe-item v-for="(i, num) in readBanner" :key="num">
            <div class="swipe" @click="goBookData(i.data[0].id, i.data[0].type)">
              <div class="swipe-img">
                <img v-lazy="i.data[0].cover_url" class="cover" />
                <img src="../assets/static/4w.png" class="shadow">
                <div v-if="i.data[0].price" class="money">¥{{ i.data[0].price }}</div>
                <a :href="i.data[0].package_path">
                  <img v-if="i.data[0].is_jurisdiction" class="download" src="../assets/static/X-.png">
                </a>
              </div>
              <span class="title">{{ i.data[0].type == "Magazine" ? i.data[0].summary : i.data[0].name }}</span>
              <span class="time">{{ getDate(i.data[0].display_time) }}</span>
            </div>
          </van-swipe-item>
        </van-swipe>
        <ReadList :readType="readType" />
      </van-tab>
    </van-tabs>
    <van-popup v-model:show="show" position="left" :style="{ height: '100vh', width: '250px' }">
      <PopupLeft @isShow="isShow" />
    </van-popup>
  </div>

  <van-tabbar route>
    <van-tabbar-item replace to="/" icon="home-o">首页</van-tabbar-item>
    <van-tabbar-item replace to="/audio" icon="music-o">音频</van-tabbar-item>
    <van-tabbar-item replace to="/read" icon="new-o">阅读</van-tabbar-item>
    <van-tabbar-item replace to="/user" icon="user-circle-o">我的</van-tabbar-item>
  </van-tabbar>
</template>

<style lang="scss" scoped>
.readpage {
  width: 100vw;
  height: 100vh;
  margin-bottom: 50px;
  overflow: auto;

  .topright {
    width: 20px;
    height: 20px;
    position: fixed;
    top: 13px;
    right: 50px;
  }

  .topleft {
    width: 24px;
    height: 20px;
    position: fixed;
    top: 13px;
    right: 15px;
  }

  .swipe {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 10px 0;

    .title {
      width: 60vw;
      font-size: 20px;
      font-weight: 900;
      white-space: nowrap;
      text-align: center;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    .time {
      font-size: 12px;
    }

    .swipe-img {
      width: 60vw;
      margin: auto;
      position: relative;

      .cover {
        width: 60vw;
        height: 42vh;
        margin: auto;
        border-radius: 5px;
      }

      .shadow {
        width: 30vw;
        height: 42vh;
        border-radius: 5px 0 0 5px;
        position: absolute;
        top: 0;
        left: 0;
      }

      .money {
        width: 12vw;
        height: 4vh;
        position: absolute;
        left: 0;
        top: 0;
        background-color: #c9ab79;
        border-radius: 0 20px 20px 0;
        text-align: center;
        color: white;
        line-height: 4vh;
      }

      .download {
        width: 5vw;
        height: 5vw;
        position: absolute;
        bottom: 1vh;
        right: 1vw;
      }
    }
  }
}
</style>