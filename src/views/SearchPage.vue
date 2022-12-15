<script setup lang="ts">
import { ref, onBeforeMount, watch, onMounted, onUnmounted } from "vue";
import { Api } from "@/apis/searchData";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { SearchHistory } from "@/stores/counter";
import { Func } from "@/data/data";
import { CollectionFollow } from "@/stores/counter";

import type {
  SearchArticle,
  SearchTopic,
  SearchColumn,
  SearchSubject,
  SearchAudio,
} from "@/searchPage";

const store = SearchHistory();
const { locatSearch } = storeToRefs(store);
const { reduceSearch, allReduceSearch, addSearch } = store;
const searchStore = CollectionFollow();
const { locatFollow } = storeToRefs(searchStore);
const { addFollow, checkFollow } = searchStore;
const getMin = (number: number) => {
  return Func.getMin(number);
};

const searchButton = ref(false);
const searchType: string = ref("");
// const articleList = ref<SearchArticle | SearchTopic | SearchColumn | SearchSubject | SearchAudio[]>([]);
const articleList: [
  SearchArticle[],
  SearchTopic[],
  SearchColumn[],
  SearchSubject[],
  SearchAudio[]
] = ref([]);

//高亮搜索字
const light = (text: string) => {
  return Func.lightHigh(value.value, text);
};

//进行搜索
const value = ref("");
const showList = ref(false);
const loding = ref(false);
const onSearch = () => {
  if (value.value.trim()) {
    loding.value = true;
    addSearch(value.value);
    HistorySearch.value = locatSearch.value;
    showList.value = true;
    getSearchList();
  }
};

//关注
const follow = (id: number, type: string, name: string) => {
  addFollow({ id: id, type: type, name: name });
};

const activeName = ref("article");

//返回上一页
const route = useRoute();
const router = useRouter();
const goBack = () => {
  value.value = "";
  showList.value = false;
  router.go(-1);
};

//清空输入
const clear = () => {
  value.value = "";
  showList.value = false;
};

//获取搜索资源
const getSearchList = async () => {
  let article = await Api.getSearch(value.value, "article");
  let topic = await Api.getSearch(value.value, "topic");
  let column = await Api.getSearch(value.value, "column");
  let subject = await Api.getSearch(value.value, "subject");
  let audio = await Api.getSearch(value.value, "audio");
  articleList.value[0] = article.data.data[0] ? article.data.data : null;
  articleList.value[1] = topic.data.data[0] ? topic.data.data : null;
  articleList.value[2] = column.data.data[0] ? column.data.data : null;
  articleList.value[3] = subject.data.data[0] ? subject.data.data : null;
  articleList.value[4] = audio.data.data[0] ? audio.data.data : null;
  loding.value = false;
};

//跳转
const goTypeSearch = (text: string) => {
  router.push({
    path: "/TypeSearch",
    query: {
      type: text,
    },
  });
};
const gotoArticle = (id: number) => {
  router.push({
    path: "/article",
    query: {
      article_id: id,
    },
  });
};
const goCollection = (id: number, type: string) => {
  console.log(type);
  if (type == "Column") {
    router.push({
      path: "/Collections",
      query: {
        type: "columns",
        id: id,
      },
    });
  } else if (type == "Topic") {
    router.push({
      path: "/Collections",
      query: {
        type: "topics",
        id: id,
      },
    });
  } else if (type == "Subject") {
    router.push({
      path: "/subjectdata",
      query: {
        id,
      },
    });
  } else if (type == "Theme") {
    router.push({
      path: "/themedata",
      query: {
        id,
      },
    });
  } else if (type == "Article") {
    router.push({
      path: "/audio-detail",
      query: {
        detail_id: id,
      },
    });
  }
};

//获取热搜
const HotSearchList = ref<string>([]);
const HotSearch = async () => {
  let { data } = await Api.HotSearch();
  HotSearchList.value = data.data;
};

//历史记录
const HistorySearch = ref<string>([]);
const isLongClick = ref(false);
const timeOutEvent = ref(0);
//历史长按
const gotouchstart = (item: string) => {
  clearTimeout(timeOutEvent.value); //清除定时器
  timeOutEvent.value = 0;
  timeOutEvent.value = setTimeout(function () {
    reduceSearch(item);
    HistorySearch.value = locatSearch.value;
    isLongClick.value = true;
  }, 1000); //这里设置定时
};

//历史点击
const gotouchend = (item: string) => {
  clearTimeout(timeOutEvent.value);
  if (timeOutEvent.value != 0 && !isLongClick.value) {
    value.value = item;
    onSearch();
  }
  isLongClick.value = false;
};
//取消历史点击和长按
const gotouchmove = () => {
  clearTimeout(timeOutEvent.value); //清除定时器
  timeOutEvent.value = 0;
};

//清空历史
const historyClear = () => {
  allReduceSearch();
  HistorySearch.value = locatSearch.value;
};

//热门搜索
const getHotSearch = (text: string) => {
  value.value = text;
  onSearch();
};

onBeforeMount(() => {
  HistorySearch.value = locatSearch.value;
  HotSearch();
});
</script>

<template>
  <div>
    <div :style="{position:'sticky',top:'-1px',zIndex:'2'}">
      <form action="/">
        <van-search v-model="value" shape="round" show-action placeholder="请输入搜索关键词" @search="onSearch"
          @focus="searchButton = true" @blur="searchButton = false" @clear="clear">
          <template #action>
            <div v-show="searchButton" @mousedown="onSearch">搜索</div>
            <div v-show="!searchButton" @click="goBack">取消</div>
          </template>
        </van-search>
      </form>
    </div>
    <div v-if="showList" class="normalsearch">
      <van-tabs v-model:active="activeName" animated sticky offset-top="53px">
        <van-tab title="文章" name="article">
          <div :style="{marginTop:'10px'}" v-show="articleList[0] && !loding">
            <div v-for="({content},index) in articleList[0]" :key="index" class="active"
              @click="gotoArticle(content.id)">
              <img :src="content.cover_url">
              <div>
                <div class="title">
                  <div class="text" v-html="light(content.title)"></div>
                </div>
              </div>
            </div>
          </div>
          <div v-show="!articleList[0] && !loding" class="none-data">
            <img src="../assets/static/3T.png">
            <span>还是空的呢</span>
            <span>暂无搜索词,换个关键字试试吧</span>
          </div>
          <div v-if="loding" class="loding">
            <div class="pic">
              <van-loading color="#1989fa" />
            </div>
          </div>
        </van-tab>
        <van-tab title="标签" name="topic">
          <div :style="{marginTop:'10px'}" v-if="articleList[1] && !loding">
            <div v-for="({content,searchable_type},index) in articleList[1]" :key="index" class="topic">
              <div class="name" @click="goCollection(content.id,searchable_type)">
                #<div v-html="light(content.name)"></div>
              </div>
              <div>
                <div class="false" @click="follow(content.id,'topics',content.name)" v-show="!checkFollow(content.id)">
                  <span>关注</span>
                </div>
                <div class="true" @click="follow(content.id,'topics',content.name)" v-show="checkFollow(content.id)">
                  <span>已关注</span>
                </div>
              </div>
            </div>
          </div>
          <div v-if="!articleList[1] && !loding" class="none-data">
            <img src="../assets/static/3T.png">
            <span>还是空的呢</span>
            <span>暂无搜索词,换个关键字试试吧</span>
          </div>
          <div v-if="loding" class="loding">
            <div class="pic">
              <van-loading color="#1989fa" />
            </div>
          </div>
        </van-tab>
        <van-tab title="杂志栏目" name="column">
          <div :style="{marginTop:'10px'}" v-if="articleList[2] && !loding">
            <div v-for="({content,searchable_type},index) in articleList[2]" :key="index" class="topic">
              <div class="name" @click="goCollection(content.id,searchable_type)">/
                <div v-html="light(content.name)">
                </div>
              </div>
              <div>
                <div class="false" @click="follow(content.id,'columns',content.name)" v-show="!checkFollow(content.id)">
                  <span>关注</span>
                </div>
                <div class="true" @click="follow(content.id,'columns',content.name)" v-show="checkFollow(content.id)">
                  <span>已关注</span>
                </div>
              </div>
            </div>
          </div>
          <div v-if="!articleList[2] && !loding" class="none-data">
            <img src="../assets/static/3T.png">
            <span>还是空的呢</span>
            <span>暂无搜索词,换个关键字试试吧</span>
          </div>
          <div v-if="loding" class="loding">
            <div class="pic">
              <van-loading color="#1989fa" />
            </div>
          </div>
        </van-tab>
        <van-tab title="单行本" name="subject">
          <div :style="{marginTop:'10px'}" v-if="articleList[3] && !loding">
            <div v-for="({content,searchable_type},index) in articleList[3]" :key="index" class="subject"
              @click="goCollection(content.id,searchable_type)">
              <img :src="content.cover_url">
              <div class="content">
                <div class="name">
                  <div v-html="light(content.name)"></div>
                </div>
                <div class="count"><span>{{content.articles_count}}篇文章</span></div>
              </div>
            </div>
          </div>
          <div v-if="!articleList[3] && !loding" class="none-data">
            <img src="../assets/static/3T.png">
            <span>还是空的呢</span>
            <span>暂无搜索词,换个关键字试试吧</span>
          </div>
          <div v-if="loding" class="loding">
            <div class="pic">
              <van-loading color="#1989fa" />
            </div>
          </div>
        </van-tab>
        <van-tab title="音频" name="audio">
          <div :style="{marginTop:'10px'}" v-if="articleList[4] && !loding">
            <div v-for="({content,searchable_type},index) in articleList[4]" :key="index" class="audio"
              @click="goCollection(content.id,searchable_type)">
              <img :src="content.cover_url">
              <div class="content">
                <div class="name">
                  <div v-html="light(content.title)"></div>
                </div>
                <div class="count">
                  <img src="../assets/static/Ea.png" class="pic">
                  <span>{{getMin(content.audio_duration)}}</span>
                </div>
              </div>
            </div>
          </div>
          <div v-if="!articleList[4] && !loding" class="none-data">
            <img src="../assets/static/3T.png">
            <span>还是空的呢</span>
            <span>暂无搜索词,换个关键字试试吧</span>
          </div>
          <div v-if="loding" class="loding">
            <div class="pic">
              <van-loading color="#1989fa" />
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <div v-show="!showList">
      <div class="search">
        <div class="search-type">
          <div class="item" @click="goTypeSearch('topics')">
            <img src="../assets/static/OV.png">
            <span>标签</span>
          </div>
          <div class="item" @click="goTypeSearch('columns')">
            <img src="../assets/static/dQ.png">
            <span>杂志栏目</span>
          </div>
          <div class="item" @click="goTypeSearch('theme_subjects')">
            <img src="../assets/static/jT.png">
            <span>单行本</span>
          </div>
          <div class="item" @click="goTypeSearch('article_alls')">
            <img src="../assets/static/0q.png">
            <span>音频</span>
          </div>
        </div>
        <div class="title title-flex">
          <div>搜索历史</div>
          <div @click="historyClear">清空</div>
        </div>
        <div class="history">
          <div class="item" v-for="item in HistorySearch" :key="item" @touchstart="gotouchstart(item)"
            @touchmove="gotouchmove" @touchend="gotouchend(item)">{{item}}</div>
        </div>
        <div class="title">热门搜索</div>
        <div class="hot-list">
          <div class="item" @click="getHotSearch(item)" v-for="item in HotSearchList" :key="item">{{item}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.search {
  width: 100vw;
  height: calc(100vh - 54px);
  overflow: auto;

  .history {
    width: 100vw;
    display: flex;
    flex-wrap: wrap;

    .item {
      margin: 10px 10px 0;
      padding: 5px 7px;
      border-radius: 999px;
      font-size: 14px;
      border: 1px solid rgb(169, 169, 169);
      color: rgb(169, 169, 169);
      background-color: rgb(248 248 248);
    }
  }

  .title {
    box-sizing: border-box;
    width: 100vw;
    padding: 10px;
    color: rgb(169, 169, 169);
  }

  .search-type {
    width: 100vw;
    display: flex;
    justify-content: space-around;
    align-items: center;

    .item {
      display: flex;
      flex-direction: column;
      align-items: center;

      img {
        width: 70px;
        height: 70px;
        margin-bottom: 10px;
      }
    }
  }

  .hot-list {
    width: 100vw;
    display: flex;
    flex-wrap: wrap;

    .item {
      margin: 10px 10px 0;
      padding: 5px 7px;
      border-radius: 999px;
      font-size: 14px;
      border: 1px solid rgb(0, 195, 255);
      color: rgb(0, 195, 255);
    }
  }

  .title-flex {
    display: flex;
    justify-content: space-between;
    margin: 10px 0 0 0;
  }
}

.normalsearch {
  width: 100vw;
  margin-top: 10px;

  .none-data {
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      width: 100vw;
    }
  }

  .loding {
    width: 100vw;
    height: 100vh;
    display: flex;

    .pic {
      margin: auto;
    }
  }

  .active {
    box-sizing: border-box;
    width: 100vw;
    padding: 0 15px;
    display: flex;
    margin-bottom: 10px;

    img {
      width: 110px;
      height: 75px;
      border-radius: 15px;
      margin-right: 15px;
    }

    .title {
      width: calc(100vw - 155px);
      display: -webkit-box;
      overflow: hidden;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;

      .text {
        font-weight: 700;
      }
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
    margin-bottom: 10px;

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