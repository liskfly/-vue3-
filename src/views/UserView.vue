<script setup lang="ts">
import { ref, onMounted, watch, onBeforeMount } from "vue";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { WayForLogin, ArticleCollection, deconstruction } from "@/stores/counter";

const route = useRoute();
const router = useRouter();
const store = WayForLogin();
const { userToken } = storeToRefs(store);
const dark = ArticleCollection();
const { lightAndFont } = storeToRefs(dark);
const { changeLight } = dark;
const Subscribe = deconstruction();
const { locatSubscribe } = storeToRefs(Subscribe);
const checked = ref("true");
const token: { passWord: string; userName: string } = ref(userToken);

const change = () => {
  changeLight();
};

const goLogin = () => {
  router.push({
    path: "/login",
  });
};

const goFollow = () => {
  router.push("/follow");
}

onMounted(() => {
  checked.value = !lightAndFont.value.isLight;
});
</script>

<template>
  <div class="user-page">
    <div class="header">
      <div>
        <img class="left" src="../assets/img/Gh.png" v-show="!token.userName" @click="goLogin">
        <img class="left" src="../assets/img/me.jpg" v-show="token.userName">
      </div>
      <div class="login">
        <div v-show="!token.userName" @click="goLogin">请登录</div>
        <div v-show="token.userName">{{token.userName}}</div>
      </div>
      <div class="userdata">
        <div class="data">资料</div>
      </div>
    </div>

    <ul class="list">
      <li @click="goFollow">
        <span class="list-num">{{locatSubscribe.length}}</span>
        <span class="list-text">收藏</span>
      </li>
      <li>
        <span class="list-num">0</span>
        <span class="list-text">关注</span>
      </li>
      <li>
        <span class="list-num">0</span>
        <span class="list-text">摘录</span>
      </li>
      <li>
        <span class="list-num">0</span>
        <span class="list-text">投票</span>
      </li>
    </ul>

    <div class="cell">
      <img class=pic src="../assets/img/2l.png">
      <div class="right">
        <span class="title">夜间模式</span>
        <van-switch v-model="checked" size="20px" @change="change" />
      </div>
    </div>
    <div class="cell">
      <img class=pic src="../assets/img/GN.png">
      <div class="right">
        <span class="title">最近阅读</span>
        <img src="../assets/img/gD.png">
      </div>
    </div>
    <div class="cell">
      <img class=pic src="../assets/img/Qb.png">
      <div class="right">
        <span class="title">购买记录</span>
        <img src="../assets/img/gD.png">
      </div>
    </div>
    <div class="cell">
      <img class=pic src="../assets/img/Ug.png">
      <div class="right">
        <span class="title">激活订阅码</span>
        <img src="../assets/img/gD.png">
      </div>
    </div>
  </div>
  <van-tabbar route>
    <van-tabbar-item replace to="/" icon="home-o">首页</van-tabbar-item>
    <van-tabbar-item replace to="/audio" icon="music-o">音频</van-tabbar-item>
    <van-tabbar-item replace to="/read" icon="new-o">阅读</van-tabbar-item>
    <van-tabbar-item replace to="/user" icon="user-circle-o">我的</van-tabbar-item>
  </van-tabbar>
</template>

<style lang="scss" scoped>
.user-page {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  .header {
    box-sizing: border-box;
    margin-top: 20px;
    padding: 0 15px 15px;
    display: flex;
    align-items: center;

    .left {
      width: 60px;
      height: 60px;
    }

    .login {
      font-size: 30px;
      font-weight: 700;
      flex: 1;
      margin-left: 20px;
    }

    .userdata {
      width: 80px;
      height: 30px;
      border-radius: 999px;
      display: flex;
      background-color: #0091fe;

      .data {
        font-size: 20px;
        margin: auto;
        color: white;
      }
    }
  }

  .list {
    margin-top: 2vh;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-around;
    li {
      display: flex;
      flex-direction: column;
      .list-num {
        text-align: center;
        font-size: 25px;
        font-weight: 700;
      }
      .list-text {
        margin-top: 1vh;
        color: #aaa;
      }
    }
  }

  .cell {
    width: 100vw;
    display: flex;
    align-items: center;

    .pic {
      width: 16px;
      height: 16px;
      margin: 10px 15px 10px;
    }

    .right {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 10px 10px 0 0;
      padding-right: 10px;
      padding-bottom: 10px;
      border-bottom: 1px solid rgb(214, 214, 214);

      .title {
        font-size: 20px;
      }

      img {
        width: 10px;
        height: 15px;
        transform: rotateZ(180deg);
      }
    }
  }
}
</style>