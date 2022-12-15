<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import type {
  ArticleContent,
  ArticleRecommend,
  Catalogue,
  ArticleCollect,
} from "../typing";
import { useRoute, useRouter } from "vue-router";
import { API } from "../apis/getData";
import { Func } from "@/data/data";
import { storeToRefs } from "pinia";
import { ArticleCollection } from "@/stores/counter";
import { getDate, getIcon } from "../utils/index";

const route = useRoute();
const router = useRouter();
const toolShow: boolean = ref(false);
const isLight: boolean = ref(true);
const fontShow: boolean = ref(false);
const catalogueShow: boolean = ref(false);
const collectionShow: boolean = ref(false);
const fontSize: number = ref(50);
const lineHight: number = ref(50);
const catalogueList = ref<Catalogue[]>([]);
const store = ArticleCollection();
const { locatCollection } = storeToRefs(store);
const { saveArticle, SaveStyle } = store;

const choiceId: any = ref(route.query.article_id);
const value: string = ref("");

const collection = () => {
  let data: ArticleCollect = {
    id: articles.value.id,
    title: articles.value.title,
    cover_url: articles.value.cover_url,
    authors_name: articles.value.authors[0].name,
    authors_id: articles.value.authors[0].id,
    authors_pic: articles.value.authors[0].avatar,
  };
  console.log(data);
  saveArticle(data);
  console.log(locatCollection);
  collectionShow.value = !collectionShow.value;
};

const initialization = () => {
  let style = Func.getStyle();
  isLight.value = style.isLight;
  fontSize.value = style.fontSize;
  lineHight.value = style.lineHeight;
  goback.value.src = isLight.value ? getIcon("P4") : getIcon("SJ");
  back.value.style.backgroundColor = isLight.value ? "#ffffff80" : "#00000080";
};

const getText = (text: string) => {
  return Func.getText(text);
};

const goBack = () => {
  SaveStyle({
    isLight: isLight.value,
    fontSize: fontSize.value,
    lineHeight: lineHight.value,
  });
  window.history.go(-1);
};

const scroll = ref(0);
const scrollHieght = (event: any) => {
  scroll.value = parseInt(event.target.scrollTop);
};

const openTool = () => {
  toolShow.value = true;
};

const fontContorl = () => {
  toolShow.value = false;
  fontShow.value = true;
};

//跳转合集
const goCollection = (id: number) => {
  router.push({
    path: "/Collections",
    query: {
      type: "topics",
      id: id,
    },
  });
};

const getCatalogue = async (id: number) => {
  let { data } = await API.getArticleCatalogue(id);
  catalogueList.value = data.data.articles;
};

const showLight = () => {
  toolShow.value = false;
  goback.value.src = isLight.value ? getIcon("SJ") : getIcon("P4");
  back.value.style.backgroundColor = isLight.value ? "#000000" : "#fff";
  isLight.value = !isLight.value;
  SaveStyle({
    isLight: isLight.value,
    fontSize: fontSize.value,
    lineHeight: lineHight.value,
  });
};

const changeArticle = async (articleId: number) => {
  let { data } = await API.getArticleData(articleId);
  articles.value = data.data;
  let recommed = await API.getArticleRecommend(articleId);
  recommeds.value = recommed.data.data;
  choiceId.value = articleId;
};

const catalogueControl = () => {
  catalogueShow.value = !catalogueShow.value;
};

const articles = ref<ArticleContent>();
const recommeds = ref<ArticleRecommend[]>();
onMounted(async () => {
  initialization();
  let { data } = await API.getArticleData(choiceId.value);
  articles.value = data.data;
  let recommed = await API.getArticleRecommend(choiceId.value);
  recommeds.value = recommed.data.data;
  getCatalogue(choiceId.value);
  collectionShow.value =
    locatCollection.value.findIndex((item) => item.id == choiceId.value) == -1
      ? false
      : true;
});
const back = ref<any>();
const goback = ref<any>();

watch(scroll, (newV) => {
  if (newV > 233) {
    goback.value.src = isLight.value ? getIcon("P4") : getIcon("SJ");
    back.value.style.backgroundColor = isLight.value ? "#fff" : "#000000";
  } else {
    goback.value.src = isLight.value ? getIcon("P4") : getIcon("SJ");
    back.value.style.backgroundColor = isLight.value
      ? "#ffffff80"
      : "#00000080";
  }
});
</script>

<script lang="ts">
export default {
  name: "articlePage",
};
</script>

<template>
  <div class="home-article" @scroll="scrollHieght" :style="{backgroundColor:isLight ? '':'black'}">

    <div class="header">
      <div class="article-header" ref="back">
        <img src="@/assets/img/p4.png" alt="返回" class="back" @click="goBack" ref="goback" />
        <img src="@/assets/img/EN.png" alt="更多" class="gd" @click="openTool" />
      </div>
    </div>
    <!-- <van-loading color="#1989fa" v-show="pageLoading"/> -->
    <div class="content" v-if="articles">
      <div class="bg" :style="{ backgroundImage: 'url(' + articles.cover_url + ')' }">
        <div class="cover">
          <div class="cover-text">
            <h1>{{ articles.title }}</h1>
            <span>{{ articles.visit_times }}阅读·{{
                                articles.favorite_times
                        }}收藏</span>
          </div>
        </div>
      </div>

      <div class="text-box" :style="{color:isLight ? '':'#888'}">
        <div class="text">
          <div class="authors">
            <div class="authors-img" v-if="articles.authors">
              <img :src="articles.authors[0].avatar" alt="authors-img" />
            </div>
            <div class="authors-megs" v-if="articles.authors">
              <p>
                {{ articles.authors[0].name }}等<span class="count">{{
                                        articles.authors.length
                                }}</span>位作者
              </p>
              <span>{{ getDate(articles.display_time) }}·阅读时长{{ articles.read_time }}分钟·{{
                                    articles.word_times
                            }}字</span>
            </div>
          </div>

          <div class="normal" @click="fontShow = false" v-if="articles.article_type != 'magazine'">
            <div class="dec" v-for="a in articles.topics" :key="a.id">
              <!-- <span class="dec-color" @click="goKeyWordArticle(a.id)">#{{ a.name }}</span> -->
              <span class="dec-color" @click="goCollection(a.id)">#{{ a.name }}</span>
            </div>
            <span class="summary">{{ articles.summary }}</span>

            <div v-html="getText(articles.content)" :style="{fontSize:`${parseInt(fontSize * 8 / 100 + 12)}px`,
            lineHeight:`${parseInt(lineHight * 10 / 100 + 15)}px`,marginTop:'10px'}" class="text-item" v-if="
                            articles.probation ||
                            articles.article_type == 'normal' ||
                            articles.article_type == 'theme'
                        "></div>
            <div class="text-bottom" v-if="
                            articles.probation ||
                            articles.article_type == 'normal' ||
                            articles.article_type == 'theme'
                        ">
              <div class="text-ascription">
                <span>本文版权归本人开发者所有</span>
                <span>未经许可不得转载或翻译</span>
              </div>
              <div class="article-like">
                <div class="like-icon">
                  <van-icon name="star-o" color="#888" v-show="!collectionShow" size="25" @click="collection" />
                  <van-icon name="star-o" color="#1989fa" size="25" v-show="collectionShow" @click="collection" />
                  <div class="fond">
                    <img src="../assets/img/_m.png" alt="" />
                  </div>
                  <i class="share"></i>
                </div>
                <span>{{ articles.favorite_times }}</span>
              </div>
            </div>

            <div class="recommend" v-if="
                            (recommeds && articles.probation) ||
                            articles.article_type == 'normal' ||
                            articles.article_type == 'theme'
                        ">
              <p class="recommend-text">相关文章</p>
              <div class="recommend-box" v-for="(r, index) in recommeds" :key="index">
                <div class="recommed-img" :style="{ backgroundImage: 'url(' + r.cover_url + ')' }">
                </div>
                <p>{{ r.title }}</p>
              </div>
            </div>
          </div>

          <!-- <div class="magazine" v-if="article.article_type == 'magazine'">
                        <div class="dec">
                            <div v-if="article.column">
                                <span class="dec-color" @click="goColumnsArticle(article.column.id)">#{{
                                        article.column.name
                                }}</span>
                                <span class="dec-color" @click="goColumnsArticle(article.column.parent_column.id)">#{{
                                        article.column.parent_column.name
                                }}</span>
                            </div>
                            <span class="summary">{{ article.summary }}</span>
                        </div>
                        <div class="comment" v-for="c in article.editor_choice_comments" :key="c.user.id">
                            <p>评论</p>
                            <div class="comment-box">
                                <div class="comment-user">
                                    <img src="https://files.cbnweek.com/a36d0b46bcc0f32dda03ec72c449d108_264x264"
                                        alt="tx" />
                                    <div class="comment-user-dec">
                                        <span class="comment-user-name">{{ c.user.nickname }}</span>
                                        <span class="comment-time">{{
                                                commentTime(c.display_time)
                                        }}</span>
                                    </div>
                                </div>
                                <div class="comment-text">{{ c.content }}</div>
                                <div class="comment-like">
                                    <span>{{ c.like_times }} <i></i></span>
                                </div>
                            </div>
                        </div>
                        <p class="more">查看更多 >></p>
                    </div> -->
        </div>
      </div>
    </div>
    <van-popup v-model:show="toolShow" position="bottom" :style="{ height: '150px' }">
      <div class="tool">
        <div class="ability" :style="{backgroundColor:isLight ? 'rgb(237, 237, 237)':'rgb(87 87 87)'}">
          <div class="light">
            <div class="light-background" @click="showLight" :style="{backgroundColor:isLight ? 'white':'#9b9b9b'}">
              <img src="../assets/static/2l.png" v-show="isLight">
              <img src="../assets/static/zI.png" v-show="!isLight">
            </div>
            <span>{{isLight ? '夜间':'日间'}}模式</span>
          </div>
          <div class="size">
            <div class="size-background" @click="fontContorl" :style="{backgroundColor:isLight ? 'white':'#9b9b9b'}">
              <img src="../assets/static/Li.png">
            </div>
            <span>字体设置</span>
          </div>
          <div class="catalogue" @click="catalogueShow = true; toolShow = false">
            <div class="catalogue-background" :style="{backgroundColor:isLight ? 'white':'#9b9b9b'}">
              <img src="../assets/static/H9.png">
            </div>
            <span>目录</span>
          </div>
        </div>
      </div>
    </van-popup>

    <van-popup v-model:show="catalogueShow" position="bottom" :style="{ height: '400px' }">
      <div :style="{backgroundColor:isLight ? '':'black'}">
        <div class="catalogue-top">
          <div></div>
          <span :style="{color:isLight ? 'black':'rgb(202 202 202)'}">目录</span>
          <div @click="catalogueControl">
            <img src="../assets/static/ui.png" alt="">
            <img src="../assets/static/8k.png" alt="">
          </div>
        </div>
        <div class="catalogue-list">
          <div class="title" v-for="({id,title}) in catalogueList" :key="id"
            :style="{color:choiceId == id ? 'rgb(0, 85, 255)':isLight ? 'black':'rgb(202 202 202)'}"
            @click="changeArticle(id)">{{title}}</div>
        </div>
      </div>
    </van-popup>

    <footer>
      <div class="bottom" @scroll="scrollHieght" :style="{backgroundColor:isLight ? 'white':'black'}">
        <div class="tool-part" v-show="fontShow">
          <div class="tool-font">
            <span :style="{color:isLight ? 'black':'#888'}">字号</span>
            <div class="control">
              <van-slider v-model="fontSize" />
            </div>
          </div>
          <div class="tool-linehight">
            <span :style="{color:isLight ? 'black':'#888'}">间距</span>
            <div class="control">
              <van-slider v-model="lineHight" />
            </div>
          </div>
        </div>
        <div class="right">
          <input class="text" type="text" placeholder="我的观点...">
          <img class="comment" src="../assets/static/Tc.png">
          <div class="article-Collection">
            <van-icon name="star-o" color="#888" v-show="!collectionShow" size="25" @click="collection" />
            <van-icon name="star-o" color="#1989fa" size="25" v-show="collectionShow" @click="collection" />
          </div>
          <div class="author">
            <img v-show="false" src="../assets/static/ak.png">
            <img src="../assets/static/gQ.png">
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.home-article {
  position: fixed;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  overflow: auto;
  transition: background-color linear 0.5s;

  .tool {
    width: 100vw;

    .ability {
      width: 100vw;
      height: 150px;
      display: flex;
      align-items: center;
      justify-content: space-around;

      .light {
        display: flex;
        flex-direction: column;
        align-items: center;

        .light-background {
          width: 80px;
          height: 80px;
          display: flex;
          border-radius: 999px;
          margin-bottom: 10px;

          img {
            width: 60px;
            height: 60px;
            margin: auto;
          }
        }
      }
      .size {
        display: flex;
        flex-direction: column;
        align-items: center;

        .size-background {
          width: 80px;
          height: 80px;
          display: flex;
          border-radius: 999px;
          margin-bottom: 10px;

          img {
            width: 40px;
            height: 40px;
            margin: auto;
          }
        }
      }
      .catalogue {
        display: flex;
        flex-direction: column;
        align-items: center;

        .catalogue-background {
          width: 80px;
          height: 80px;
          display: flex;
          border-radius: 999px;
          margin-bottom: 10px;

          img {
            width: 40px;
            height: 40px;
            margin: auto;
          }
        }
      }
    }
  }

  .catalogue-top {
    box-sizing: border-box;
    width: 100vw;
    padding: 10px;
    display: flex;
    justify-content: space-between;

    span {
      font-size: 20px;
    }

    img {
      width: 20px;
      height: 20px;
    }
  }

  .catalogue-list {
    box-sizing: border-box;
    width: 100vw;
    height: 360px;
    padding: 0 10px;
    // overflow: auto;

    .title {
      width: calc(100vw - 20px);
      padding: 10px;
      border-bottom: 0.3px solid #cecece;
      display: -webkit-box;
      overflow: hidden;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }
  }

  footer {
    width: 100vw;

    .bottom {
      width: 100vw;
      //   background-color: white;
      position: fixed;
      bottom: 0;

      .right {
        display: flex;
        align-items: center;
        margin: 10px 0;
        .comment {
          width: 20px;
          margin: 0 10px;
        }

        .article-Collection {
          margin: 0 10px;
        }

        .author {
          img {
            margin: 0 10px;
            width: 20px;
            margin-top: 5px;
          }
        }

        .text {
          flex: 1;
          margin-left: 15px;
          padding: 5px 20px;
          background-color: rgb(221, 219, 219);
          border: 0;
          border-radius: 999px;
        }
      }

      .tool-part {
        width: 100vw;

        .tool-font {
          width: 100vw;
          height: 50px;
          display: flex;
          align-items: center;

          span {
            margin: 0 20px;
          }

          .control {
            flex: 1;
            margin-right: 20px;
          }
        }

        .tool-linehight {
          width: 100vw;
          height: 50px;
          display: flex;
          align-items: center;

          span {
            margin: 0 20px;
          }

          .control {
            flex: 1;
            margin-right: 20px;
          }
        }
      }
    }
  }

  .header {
    .article-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: fixed;
      top: 0;
      left: 0;
      padding: 10px 3vw;
      width: 100%;
      height: 40px;
      z-index: 999;
      background-color: #ffffff80;

      .back {
        width: 10px;
        height: 20px;
      }

      .gd {
        width: 20px;
        height: 5px;
      }
    }
  }

  .content {
    width: 100vw;
    margin-bottom: 60px;

    .bg {
      position: relative;
      width: 100vw;
      height: 35vh;
      background-size: 100% 100%;

      .cover {
        display: flex;
        align-items: flex-end;
        padding: 20px 3vw;
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        color: #fff;
        background-image: linear-gradient(
          0deg,
          rgba(0, 0, 0, 0.6),
          rgba(0, 0, 0, 0.1)
        );

        .cover-text {
          h1 {
            font-size: 18px;
            line-height: 25px;
          }

          span {
            font-size: 12px;
          }
        }
      }
    }

    .text-box {
      padding: 0 3vw;

      .text {
        .authors {
          display: flex;
          margin-top: 15px;
          width: 100%;
          height: 40px;

          .authors-img {
            margin-right: 10px;
            border-radius: 999px;
            width: 40px;
            height: 40px;
            overflow: hidden;

            img {
              width: 100%;
            }
          }

          .authors-megs {
            display: flex;
            flex-direction: column;
            justify-content: space-around;

            p {
              font-size: 14px;

              .count {
                font-size: 14px;
                color: #0090f0;
              }
            }

            span {
              font-size: 12px;
              color: #888;
            }
          }
        }

        .normal {
          width: 100%;

          .dec {
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            width: 100%;
            height: 5vh;
            font-size: 13px;

            .dec-color {
              margin-top: 5px;
              margin-right: 20px;
              font-size: 13px;
              color: #0090f0;
            }
          }

          .summary {
            color: #888;
            font-size: 12px;
          }

          .text-bottom {
            margin: 25px 0;

            .text-ascription {
              display: flex;
              flex-direction: column;
              align-items: flex-end;

              span {
                font-size: 13px;
                line-height: 18px;
                color: #888;
              }
            }

            .article-like {
              margin-top: 20px;
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 10px;

              // justify-content: center;
              // gap: 20px;
              .like-icon {
                display: flex;
                gap: 20px;
                align-items: flex-end;

                i {
                  width: 24px;
                  height: 23px;
                }

                .fond {
                  border-radius: 999px;
                  width: 50px;
                  height: 50px;
                  overflow: hidden;

                  img {
                    width: 100%;
                  }
                }

                .collect {
                  background-image: url(@/assets/img/Ip1.png);
                  background-repeat: no-repeat;
                  background-size: 100% 100%;
                }

                .share {
                  background-image: url(@/assets/img/T5.png);
                  background-repeat: no-repeat;
                  background-size: 100% 100%;
                }
              }

              span {
                font-size: 13px;
                color: #888;
              }
            }
          }

          .recommend {
            border-top: 2px solid #888;

            .recommend-text {
              padding: 10px 0;
            }

            .recommend-box {
              display: flex;
              gap: 20px;
              padding: 5px 0;
              align-items: flex-start;

              .recommed-img {
                border-radius: 5px;
                width: 110px;
                height: 60px;
                overflow: hidden;
                background-repeat: no-repeat;
                background-size: cover;
                background-position: center;
              }

              p {
                margin-top: 1vh;
                font-size: 13px;
                flex: 0 0 220px;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
              }
            }
          }
        }

        .comment {
          border-bottom: 2px solid #eee;

          .comment-box {
            padding: 10px 0;
            display: flex;
            flex-direction: column;

            .comment-user {
              display: flex;
              gap: 10px;
              align-items: center;

              img {
                width: 30px;
                height: 30px;
              }

              .comment-user-dec {
                display: flex;
                flex-direction: column;
                gap: 5px;

                .comment-user-name {
                  font-size: 14px;
                }

                .comment-time {
                  font-size: 12px;
                  color: #888;
                }
              }
            }

            .comment-text {
              padding: 10px;
              font-size: 14px;
              line-height: 18px;
            }

            .comment-like {
              display: flex;
              justify-content: flex-end;

              span {
                font-size: 12px;
                color: #888;

                i {
                  width: 14px;
                  height: 14px;
                  background-image: url(@/assets/img/gQ.png);
                  background-size: 100% 100%;
                  background-repeat: no-repeat;
                }
              }
            }
          }
        }

        .more {
          margin-top: 20px;
          float: right;
          font-size: 12px;
          color: #0090f0;
        }
      }
    }
  }

  .magazine {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    bottom: 0;
    left: 0;
    padding: 10px 3vw;
    border-top: 1px solid #eee;
    width: 100%;
    height: 45px;
    color: #fff;
    font-size: 16px;
    background-color: #0090f0;
    z-index: 999;
  }
}
</style>