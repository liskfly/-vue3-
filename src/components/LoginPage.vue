<script setup lang="ts">
import { ref, onMounted, watch, onBeforeMount } from "vue";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { WayForLogin } from "@/stores/counter";
import { showToast } from "vant";

const store = WayForLogin();
const { userToken } = storeToRefs(store);
const { finishLogin, finishLogon } = store;
const route = useRoute();
const router = useRouter();
const username = ref("");
const password = ref("");
const islogin = ref("");
const userInfo = ref([]);
const value = ref({});
const token:{passWord:string,userName:string} = ref(userToken)

const goBack = () => {
  router.go(-1);
};

const control = (index) => {
  islogin.value = index;
  password.value = ''
  username.value = ''
};

watch(
  () => token.value,
  (newVal) => {
      router.go(-1);
  }
);

const userLogon = () => {
  if (password.value.trim() != "" && username.value.trim() != "") {
    finishLogon({ password: password.value, userName: username.value });
  } else {
    showToast("密码或用户名为空");
  }
};

const userLogin = () => {
  if (password.value.trim() != "" && username.value.trim() != "") {
    finishLogin({ password: password.value, userName: username.value });
  } else {
    ("密码或用户名为空");
  }
};
</script>

<template>
  <div class="loginPage">
    <img src="../assets/img/bg.jpg" class="bg">
    <div class="operation">
      <div class="head">
        <img src="../assets/img/me.jpg">
      </div>
      <div class="loginpage">
        <div class="welcome">
          <span>YiMagazine</span>
        </div>
        <div class="control">
          <span @click="control(1)" :class="islogin ? (islogin == 1 ? 'line-show':'line-hidden'):''"
            class="login-control">登录</span>
          <span @click="control(2)" :class="islogin ? (islogin == 2 ? 'line-show':'line-hidden'):''"
            class="logon-control">注册</span>
        </div>
        <div :class="islogin ? (islogin == 1 ? 'show':'hidden'):''" class="login">
          <div class="title">
            <span>login</span>
          </div>
          <van-form :show-error-message="false">
            <van-field v-model="username" name="用户名" label="用户名" placeholder="用户名"
              :rules="[{ required: true, message: '请填写用户名' }]" />
            <van-field v-model="password" type="password" name="密码" label="密码" placeholder="密码" />
          </van-form>
          <div class="button">
            <van-button @click="userLogin" round size="large" color="linear-gradient(to right, #f8cde6, #b4c1e4)">
              登录
            </van-button>
          </div>
        </div>
        <div :class="islogin ? (islogin == 2 ? 'show':'hidden'):''" class="logon">
          <div class="title">
            <span>logon</span>
          </div>
          <van-form :show-error-message="false">
            <van-field v-model="username" name="用户名" label="用户名" placeholder="用户名"
              :rules="[{ required: true, message: '请填写用户名' }]" />
            <van-field v-model="password" type="password" name="密码" label="密码" placeholder="密码" />
          </van-form>
          <div class="button">
            <van-button @click="userLogon" round size="large" color="linear-gradient(to right, #f8cde6, #b4c1e4)">
              注册
            </van-button>
          </div>
        </div>
      </div>
    </div>
    <div class="top">
      <img src="../assets/img/p4.png" @click="goBack">
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "login",
};
</script>

<style lang="scss" scoped>
.loginPage {
  width: 100vw;
  position: relative;
  display: flex;
  z-index: 12;

  .top {
    box-sizing: border-box;
    position: fixed;
    top: 0;
    width: 100vw;
    padding: 10px;
    background: rgb(128, 128, 128,0.1);

    img {
      width: 10px;
      height: 18px;
    }
  }

  .bg {
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
  }

  .operation {
    width: 100vw;
    position: absolute;
    top: 0;
    margin-top: 80px;

    .head {
      width: 100vw;
      display: flex;

      img {
        width: 80px;
        margin: auto;
        border-radius: 999px;
      }
    }

    .loginpage {
      width: 270px;
      padding: 10px;
      margin: 20px auto;
      background-color: rgb(156, 156, 156, 0.5);
      border-radius: 15px;

      .welcome {
        width: 100%;
        padding: 20px 0;
        display: flex;

        span {
          margin: auto;
          font-size: 22px;
          color: white;
          font-family: "穿越寒冬拥抱你";
        }
      }

      .control {
        width: 100%;
        height: 40px;
        display: flex;
        background-color: rgb(255, 255, 255);
        border-radius: 10px 10px 0 0;

        span {
          position: relative;
          margin: auto;
          padding: 5px 10px;
        }

        .login-control {
          &:after {
            content: "";
            position: absolute;
            width: 100%;
            height: 2px;
            background-color: rgb(195, 0, 255);
            bottom: 0;
            right: 0;
          }
        }

        .logon-control {
          &:after {
            content: "";
            position: absolute;
            width: 0;
            height: 2px;
            background-color: rgb(195, 0, 255);
            bottom: 0;
            left: 0;
          }
        }

        .line-show {
          &:after {
            width: 100%;
            transition: width ease-in-out 0.7s;
          }
        }

        .line-hidden {
          &:after {
            width: 0;
            transition: width ease-in-out 0.7s;
          }
        }
      }

      .login {
        height: 213px;
        width: 100%;
        overflow: hidden;
        background-color: white;
        border-radius: 0 0 10px 10px;
      }

      .title {
        width: 100%;
        height: 50px;
        display: flex;
        background-color: white;
        border-top: 1px solid rgb(223, 223, 223);

        span {
          margin: auto;
          font-size: 25px;
          font-weight: 700;
        }
      }

      .logon {
        height: 0px;
        width: 100%;
        overflow: hidden;
        background-color: white;
        border-radius: 0 0 10px 10px;
      }

      .show {
        height: 213px;
        width: 100%;
        overflow: hidden;
        animation: show 0.7s linear;
      }

      .hidden {
        height: 0;
        width: 100%;
        overflow: hidden;
        animation: hidden 0.7s linear;
      }

      @keyframes show {
        0% {
          height: 0;
        }
        50% {
          height: 0;
        }
        100% {
          height: 213px;
        }
      }

      @keyframes hidden {
        0% {
          height: 213px;
        }
        50% {
          height: 0;
        }
        100% {
          height: 0;
        }
      }

      .button {
        width: 100%;
        padding: 0 20px;
        background-color: white;
        margin-top: 10px;
      }
    }
  }
}
</style>