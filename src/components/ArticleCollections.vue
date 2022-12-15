<script setup lang="ts">
import { ref, onMounted, watch, onBeforeMount } from "vue";
import { useRoute, useRouter } from "vue-router";
import { API } from "../apis/getData";
import type { TopiceTop, AuthorsTop, CollectionList } from "../typing";
import { storeToRefs } from "pinia";
import { CollectionFollow } from "@/stores/counter";

const route = useRoute();
const router = useRouter();
const store = CollectionFollow();
const { locatFollow } = storeToRefs(store);
const { addFollow, checkFollow } = store;
const id: number = route.query.id as unknown as number;
const type: string = route.query.type as unknown as string;

const topData = ref<TopiceTop | AuthorsTop[]>([]);
const getTop = async () => {
  let { data } = await API.getCollectionsTop(type, id);
  topData.value = data.data;
};

const listData = ref<CollectionList[]>([]);
const getCollectionList = async () => {
  let { data } = await API.getArticleCollections(type, id);
  listData.value = data.data;
};

const goBack = () => {
  router.go(-1);
};

const follow = () => {
  addFollow({'id':topData.value.id,'type':type,'name':topData.value.name})
}

onBeforeMount(() => {
  getTop();
  getCollectionList();
});
</script>

<script lang="ts">
export default {
  name: "collection",
};
</script>

<template>
  <div class="collections">
    <div class="space"></div>
    <div class="collections-top">
      <div>
        <img class="backblack" src="../assets/static/P4.png" @click="goBack">
      </div>
      <span class="title">{{topData.name}}</span>
      <div></div>
    </div>
    <div v-if="type == 'topics' || type == 'columns'" class="topics">
      <div class="left">
        <div class="name">{{topData.name}}</div>
        <div>
          <span class="count">{{topData.articles_count}}篇文章</span>
          <span class="line">|</span>
          <span class="count">{{topData.followers_count}}人关注</span>
        </div>
      </div>
      <div class="follow">
        <div class="false" @click="follow" v-show="!checkFollow(topData.id)"><span>关注</span></div>
        <div class="true" @click="follow" v-show="checkFollow(topData.id)"><span>已关注</span></div>
      </div>
    </div>
    <div v-if="type == 'authors'" class="authors">
      <div class="top">
        <div class="left">
          <div class="name">{{topData.name}}</div>
          <div>
            <span class="count">{{topData.articles_count}}篇文章</span>
            <span class="line">|</span>
            <span class="count">{{topData.followers_count}}人关注</span>
          </div>
          <div class="follow">
            <div class="false" @click="follow" v-show="!checkFollow(topData.id)"><span>关注</span></div>
            <div class="true" @click="follow" v-show="checkFollow(topData.id)"><span>已关注</span></div>
          </div>
        </div>
        <img class="avatar" :src="topData.avatar">
      </div>
      <div class="bottom">
        <span>{{topData.introduction}}</span>
      </div>
    </div>
    <div class="news">
      <div>
        <div class="item" v-for="{ title, cover_url, id } in listData" :key="id">
          <div class="show-pic">
            <img :src="cover_url" class="cover-url" />
            <img src="" />
          </div>
          <div>
            <span class="title">{{ title }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.collections {
  width: 100vw;
  height: 45vh;
  background-color: rgb(241, 241, 241);

  .space {
    width: 100vw;
    height: 43px;
  }

  .collections-top {
    box-sizing: border-box;
    width: 100vw;
    padding: 10px;
    position: fixed;
    top: 0;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: white;

    .backblack {
      width: 10px;
      height: 20px;
    }

    .title {
      width: 60vw;
      height: 25px;
      text-align: center;
      font-size: 20px;
      margin-right: 30px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }

  .authors {
    width: calc(100vw - 40px);
    margin: 20px; 
    background-color: white;
    border-radius: 10px;

    .top {
      box-sizing: border-box;
      width: 100%;
      padding: 20px 15px 15px;
      border-bottom: 1px solid rgb(183, 183, 183);
      border-radius: 10px 10px 0 0;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .left {
        .name {
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 10px;
        }

        .count {
          font-size: 12px;
          color: rgb(184, 184, 184);
        }

        .line {
          color: rgb(184, 184, 184);
          padding: 0 10px;
        }

        .follow {
          margin-top: 20px;
          .false {
            width: 80px;
            padding: 5px;
            border-radius: 999px;
            background-color: #1989fa;
            color: white;
            display: flex;

            span {
              margin: auto;
            }
          }

          .true {
            width: 80px;
            padding: 5px;
            border-radius: 999px;
            border: 1px solid #1989fa;
            color: #1989fa;
            display: flex;

            span {
              margin: auto;
            }
          }
        }
      }

      .avatar {
        width: 60px;
        height: 60px;
      }
    }

    .bottom {
      box-sizing: border-box;
      width: 100%;
      padding: 10px 15px;
      color: rgb(189, 189, 189);
    }
  }

  .topics {
    box-sizing: border-box;
    width: 100vw;
    padding: 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: white;

    .left {
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .name {
        font-size: 18px;
        font-weight: 700;
        margin-bottom: 10px;
      }

      .count {
        font-size: 12px;
        color: rgb(184, 184, 184);
      }

      .line {
        color: rgb(184, 184, 184);
        padding: 0 10px;
      }
    }

    .follow {
      .false {
        width: 80px;
        padding: 5px;
        border-radius: 999px;
        background-color: #1989fa;
        color: white;
        display: flex;

        span {
          margin: auto;
        }
      }

      .true {
        width: 80px;
        padding: 5px;
        border-radius: 999px;
        border: 1px solid #1989fa;
        color: #1989fa;
        display: flex;

        span {
          margin: auto;
        }
      }
    }
  }

  .news {
    box-sizing: border-box;
    width: 100vw;
    padding: 2vh 6vw 2vh 4vw;
    background-color: white;

    .item {
      margin: 2vh 0;
      display: flex;

      .show-pic {
        position: relative;
        margin-right: 4vw;
        .cover-url {
          width: 30vw;
          border-radius: 3px;
        }
      }

      .title {
        width: 55vw;
        font-size: 16px;
        font-weight: 700;
        -webkit-line-clamp: 2;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>