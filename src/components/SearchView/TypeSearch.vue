<script setup lang="ts">
import { ref, onBeforeMount, watch, onMounted, onUnmounted } from "vue";
import { Api } from "@/apis/searchData";
import { useRoute, useRouter } from "vue-router";
import { get } from "vant/lib/utils";
import { Func } from "@/data/data";
import { storeToRefs } from "pinia";
import { CollectionFollow } from "@/stores/counter";

const route = useRoute();
const router = useRouter();
const store = CollectionFollow();
const { locatFollow } = storeToRefs(store);
const { addFollow, checkFollow } = store;
const type: string = route.query.type as unknown as number;
const goBack = () => {
  router.go(-1);
};

const getMin = (number: number) => {
  return Func.getMin(number);
};

const follow = (id:number,name:string) => {
  addFollow({id,type,name})
}

const searchList = ref([]);

const getTypeSearch = async () => {
  let { data } = await Api.getTypeSearch(type);
  if (type == "topics") {
    searchList.value = data.data;
  } else if (type == "columns") {
    searchList.value = data.data.parent_columns[0].child_columns;
  } else if (type == "theme_subjects") {
    searchList.value = data.data;
  } else if (type == 'article_alls') {
    searchList.value = data.data;
  }
};

const goCollection = (id: number,choiceType:string) => {
  if (type == "columns") {
    router.push({
      path: "/Collections",
      query: {
        type: "columns",
        id: id,
      },
    });
  } else if (type == "topics") {
    router.push({
      path: "/Collections",
      query: {
        type: "topics",
        id: id,
      },
    });
  } else if (choiceType == "subject") {
    router.push({
      path: "/subjectdata",
      query: {
        id,
      },
    });
  } else if (choiceType == "theme") {
    router.push({
      path: "/themedata",
      query: {
        id,
      },
    });
  } else if (type == "article_alls") {
    router.push({
      path: "/audio-detail",
      query: {
        detail_id: id,
      },
    });
  }
};

onBeforeMount(() => {
  getTypeSearch();
});
</script>

<script lang="ts">
export default {
  name: "typeSearch",
};
</script>

<template>
  <div class="type-search">
    <div class="top" @click="goBack">
      <img class="backblack" src="../../assets/static/P4.png">
      <div class="title" v-if="type == 'topics'">热门标签</div>
      <div class="title" v-if="type == 'columns'">热门杂志栏目</div>
      <div class="title" v-if="type == 'theme_subjects'">热门单行本</div>
      <div class="title" v-if="type == 'article_alls'">热门音频</div>
      <div></div>
    </div>
    <div v-if="type == 'topics'">
      <div v-for="({name,id},index) in searchList" :key="index" class="topic">
        <div class="name" @click="goCollection(id)">{{name}}</div>
        <div>
        <div class="false" @click="follow(id,name)" v-show="!checkFollow(id)"><span>关注</span></div>
        <div class="true" @click="follow(id,name)" v-show="checkFollow(id)"><span>已关注</span></div>
        </div>
      </div>
    </div>
    <div v-if="type == 'columns'">
      <div v-for="({name,id},index) in searchList" :key="index" class="topic">
        <div class="name"  @click="goCollection(id)">/{{name}}</div>
        <div>
        <div class="false" @click="follow(id,name)" v-show="!checkFollow(id)"><span>关注</span></div>
        <div class="true" @click="follow(id,name)" v-show="checkFollow(id)"><span>已关注</span></div>
        </div>
      </div>
    </div>
    <div v-if="type == 'theme_subjects'">
      <div v-for="({cover_url,articles_count,name,type,id},index) in searchList" :key="index" class="subject" @click="goCollection(id,type)">
        <img :src="cover_url">
        <div class="content">
          <div class="name">
            {{name}}
          </div>
          <div class="count"><span>{{articles_count}}篇文章</span></div>
        </div>
      </div>
    </div>
    <div v-if="type == 'article_alls'">
      <div v-for="({title,audio_duration,cover_url,article_type,id},index) in searchList" :key="index" class="audio" @click="goCollection(id,type)">
        <img :src="cover_url">
        <div class="content">
          <div class="name">
            {{title}}
          </div>
          <div class="count">
            <img src="../../assets/static/Ea.png" class="pic">
            <span>{{getMin(audio_duration)}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.type-search {
  width: 100vw;
  height: 100vh;
  overflow: auto;

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

  .topic {
    box-sizing: border-box;
    width: 100vw;
    padding: 10px;
    border-bottom: 0.1px solid rgb(218, 218, 218);
    display: flex;
    justify-content: space-between;
    align-items: center;

    .name {
      display: flex;
      font-weight: 700;
    }

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

  .subject {
    box-sizing: border-box;
    padding: 0 15px;
    display: flex;
    margin-top: 10px;

    img {
      width: 80px;
      margin-right: 15px;
    }

    .content {
      width: calc(100vw - 125px);

      .name {
        width: 100%;
        font-size: 18px;
        font-weight: 700;
        font-weight: 700;
        display: -webkit-box;
        overflow: hidden;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }

      .count {
        font-size: 12px;
        color: rgb(182, 182, 182);
        margin-top: 10px;
      }
    }
  }
  
    .audio {
    box-sizing: border-box;
    padding: 0 15px;
    display: flex;
    margin-bottom: 10px;

    img {
      width: 80px;
      border-radius: 5px;
      margin-right: 15px;
    }

    .content {
      width: calc(100vw - 125px);

      .name {
        width: 100%;
        font-size: 18px;
        font-weight: 700;
        font-weight: 700;
        display: -webkit-box;
        overflow: hidden;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }

      .count {
        font-size: 12px;
        color: rgb(182, 182, 182);
        margin-top: 10px;
        display: flex;
        align-items: center;

        .pic {
          width: 12px;
          margin-right: 5px;
        }
      }
    }
  }
}
</style>