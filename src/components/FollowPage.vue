<script setup lang="ts">
import { ref, onBeforeMount, watch, onMounted, onUnmounted } from "vue";
import { Api } from "@/apis/searchData";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { deconstruction, ArticleCollection } from "@/stores/counter";

const route = useRoute();
const router = useRouter();
const Subscribe = deconstruction();
const { locatSubscribe } = storeToRefs(Subscribe);
const Collection = ArticleCollection();
const { locatCollection } = storeToRefs(Collection);

const goBack = () => {
  router.go(-1);
};

const goMagazine = (id: number) => {
  router.push({
    path: "/magazinedata",
    query: {
      id,
    },
  });
};

const goArticle = (id: number) => {
  router.push({
    path: "/article",
    query: {
      article_id: id,
    },
  });
};

const goAuthors = (id:number) => {
  router.push({
    path: "/Collections",
    query: {
      type: "authors",
      id: id,
    },
  });
};
</script>

<template>
  <div>
    <div class="top" @click="goBack">
      <img class="backblack" src="../assets/static/P4.png">
      <div class="title">我的收藏</div>
      <div></div>
    </div>
    <van-tabs>
      <van-tab title="杂志">
        <div class="magazine">
          <div class="item" v-for="({id,url,title}) in locatSubscribe" @click="goMagazine(id)" :key="id">
            <img :src="url">
            <span>{{title}}</span>
          </div>
        </div>
      </van-tab>
      <van-tab title="文章">
        <div class="article" v-for="{authors_id,authors_name,authors_pic,cover_url,title,id} in locatCollection"
          :key="id">
          <div class="authors" @click="goAuthors(authors_id)">
            <img :src="authors_pic">
            <span>{{authors_name}}</span>
          </div>
          <div class="article-item" @click="goArticle(id)">
            <img :src="cover_url">
            <span>{{title}}</span>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<style lang="scss" scoped>
.top {
  box-sizing: border-box;
  width: 100vw;
  padding: 10px;
  position: sticky;
  top: -1px;
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
    text-align: center;
    width: 60vw;
    font-size: 20px;
  }
}

.magazine {
  box-sizing: border-box;
  width: 100vw;
  padding: 0 2vw;
  display: flex;
  flex-wrap: wrap;

  .item {
    box-sizing: border-box;
    width: 32vw;
    padding: 2vw;
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      width: 28vw;
      height: 140px;
      margin-bottom: 10px;
    }

    span {
      width: 28vw;
      font-size: 14px;
      font-weight: 700;
      text-align: center;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}

.article {
  width: 100vw;
  padding-bottom: 10px;
  border-bottom: 1px solid gainsboro;

  .authors {
    box-sizing: border-box;
    width: 100vw;
    padding: 10px 15px;
    display: flex;
    align-items: center;

    img {
      width: 25px;
      height: 25px;
      margin-right: 15px;
      border-radius: 999px;
      align-items: center;
    }

    span {
      font-size: 18px;
    }
  }

  .article-item {
    box-sizing: border-box;
    width: 100vw;
    padding: 0 15px;
    display: flex;

    img {
      width: 120px;
      border-radius: 10px;
      height: 80px;
      margin-right: 15px;
    }

    span {
      font-weight: 700;
    }
  }
}
</style>