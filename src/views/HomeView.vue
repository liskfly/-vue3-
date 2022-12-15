<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue"
import axios from "axios"
import NewsWeek from "../components/NewsWeek.vue"
import type { BannersType, Info, Magazine } from "../typing"
import { API } from "../apis/getData"
import { useRouter } from 'vue-router'
import { getDate } from '../utils/index'

const list = ref<Info[]>([]);
const infos = ref<any[]>([]);
const i = ref(1)
const end = ref(5)
const loading = ref(false);
const finished = ref(false);
const onLoad = () => {
  // 异步更新数据
  // setTimeout 仅做示例，真实场景中一般为 ajax 请求
  setTimeout(() => {

    for (i.value; i.value < end.value; i.value++) {
      axios.get(`http://api2021.cbnweek.com/v4/first_page_infos?page=${i.value}`)
        .then(({ data }) => {
          // console.log(data);
          infos.value = data.data
          // console.log(infos.value);

          infos.value.forEach(item => {
            list.value.push(item.data[0])
          })
        })
    }

    // console.log(list.value);


    end.value = i.value + 5
    // 加载状态结束
    loading.value = false;

    // 数据全部加载完成
    if (end.value >= 50) {
      finished.value = true;
    }


  }, 3000);
};

const article_type = (type: string, times: number, magazine: Magazine) => {
  if (type == "normal") {
    return times + " " + "阅读";
  } else {
    return magazine.name;
  }
}

// const getDate = (time: any) => {
//   let date = new Date(time);
//   let str = `${date.getFullYear()}年${date.getMonth() + 1
//     }月${date.getDate()}日`;
//   return str;
// }

const router = useRouter()
// 跳转文章
const gotoArticle = (id: number) => {
  router.push({
    path: '/article',
    query: {
      article_id: id
    }
  })
}

//跳转搜索
const gotoSearch = () => {
  router.push({
    path: '/search'
  })
}

const banners = ref<BannersType[]>([])
onMounted(async () => {
  let { data } = await API.getBanner()
  banners.value = data.data
})
</script>

<template>
  <!-- 头部 -->
  <div class="headlines">
    <span>YiMagazine</span>
    <img src="../assets/img/Yg.png" @click="gotoSearch" />
  </div>

  <!-- 轮播图 -->
  <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
    <van-swipe-item v-for="item in banners" :key="item.bannerable_id"><img :src="item.cover_url" alt="banner">
    </van-swipe-item>
  </van-swipe>

  <!-- 每周新闻 -->
  <div class="newsweek">
    <NewsWeek></NewsWeek>
  </div>

  <!-- 主体信息 -->
  <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
    <van-cell class="info" v-for="item in list" :key="item.title">
      <div class="item" @click="gotoArticle(item.id)">
        <div class="text">
          <h2>{{ item.title }}</h2>
          <span>{{ getDate(item.display_time) }}·阅读时长{{ item.read_time }}分钟·{{
              item.word_times
          }}字</span>
        </div>

        <div class="photo">
          <img v-lazy="item.cover_url" alt="img" />
        </div>

        <div class="item-bottom">
          <span class="text" :class="{ active: item.article_type == 'magazine' }">{{
              article_type(item.article_type, item.visit_times, item.magazine)
          }} </span>
          <div class="icon">
            <span class="like">{{ item.like_times }} <i></i></span>
            <span class="comment">{{ item.comment_times }} <i></i></span>
          </div>
        </div>
      </div>
    </van-cell>
  </van-list>

  <!-- 底部导航 -->
  <van-tabbar route>
    <van-tabbar-item replace to="/" icon="home-o">首页</van-tabbar-item>
    <van-tabbar-item replace to="/audio" icon="music-o">音频</van-tabbar-item>
    <van-tabbar-item replace to="/read" icon="new-o">阅读</van-tabbar-item>
    <van-tabbar-item replace to="/user" icon="user-circle-o">我的</van-tabbar-item>
  </van-tabbar>
</template>

<style lang="scss" scoped>
.headlines {
  width: 100vw;
  padding: 2vh 10px 1vh 25vw;
  display: flex;
  justify-content: space-between;
  font-weight: 900;
  align-items: center;
  position: fixed;
  top: 0;
  z-index: 999;
  background-color: white;

  span {
    font-family: "Microsoft YaHei";
    font-size: 28px;
  }

  img {
    width: 18px;
    height: 18px;
  }
}

.my-swipe {
  width: 100vw;
  margin-top: 7vh;

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

.info {
  padding: 0 3vw;

  .item {
    padding: 20px 0;
    border-bottom: 1px solid #eee;

    .text {
      text-align: left;
      h2{
        color: black;
        font-size: 16px;
        font-weight: 900;
      }
      span {
        // display: inline-block;
        // margin-top: 10px;
        font-size: 13px;
        color: #888;
      }
    }

    .photo {
      position: relative;
      margin: 1vh 0;
      border-radius: 5px;
      width: 100%;
      height: 200px;
      overflow: hidden;

      img {
        width: 100%;
        height: 200px;
      }

      .top {
        position: absolute;
        right: 10px;
        bottom: 15px;
        border-radius: 999px;
        width: 23px;
        height: 23px;
        background-image: url(../assets/img/3f.png);
        background-size: 100% 100%;
      }
    }

    .item-bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .text {
        font-size: 13px;
        color: #888;
      }

      .active {
        color: rgb(23, 122, 244);
      }

      .icon {
        display: flex;

        span {
          display: flex;
          align-items: center;
          font-size: 13px;
          color: #888;

          i {
            display: inline-block;
            margin-left: 5px;
            width: 14px;
            height: 14px;
            background-size: 100% 100%;
            background-repeat: no-repeat;
          }
        }

        .like {
          i {
            background-image: url(../assets/img/gQ.png);
          }
        }

        .comment {
          margin-left: 10px;

          i {
            background-image: url(../assets/img/Tc.png);
          }
        }
      }
    }
  }
}

.van-list {
  width: 100vw;
  display: flex;
  flex-direction: column;
  margin-bottom: 5vh;
}
</style>

