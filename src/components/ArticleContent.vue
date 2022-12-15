<script setup lang="ts">
import { ref, onMounted, watch } from "vue"
import type { ArticleContent, ArticleRecommend } from "../typing"
import { useRoute, useRouter } from 'vue-router';
import { API } from "../apis/getData"
import { getDate, getIcon } from '../utils/index'

const route = useRoute();
const router = useRouter();
const scroll = ref(0);
const back = ref<any>();
const goback = ref<any>();
const articles = ref<ArticleContent>();
const recommeds = ref<ArticleRecommend[]>();
const id: any = route.query.article_id;
// API.getArticleData(id)

const goBack = () => {
    window.history.go(-1)
}

const scrollHieght = (event: any) => {
    // this.scroll = parseInt(event.target.scrollTop)
    scroll.value = parseInt(event.target.scrollTop)
    // console.log(event.target.scrollTop);
}

onMounted(async () => {
    let { data } = await API.getArticleData(id)
    articles.value = data.data

    let recommed = await API.getArticleRecommend(id)
    recommeds.value = recommed.data.data
    // console.log(recommeds.value);
})

watch(scroll, (newV) => {
    if (newV > 233) {
        goback.value.src = getIcon("P4")
        back.value.style.backgroundColor = "#fff"
    } else {
        goback.value.src = getIcon("SJ")
        back.value.style.backgroundColor = "#ffffff80"
    }
})

</script>

<script lang="ts">
export default {
    name: "article",
};
</script>

<template>
    <div class="home-article" @scroll="scrollHieght">

        <div class="header">
            <div class="article-header" ref="back">
                <img src="@/assets/img/SJ.png" alt="返回" class="back" @click="goBack" ref="goback" />
                <img src="@/assets/img/EN.png" alt="更多" class="gd" />
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

            <div class="text-box">
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

                    <div class="normal" v-if="articles.article_type != 'magazine'">
                        <div class="dec" v-for="a in articles.topics" :key="a.id">
                            <!-- <span class="dec-color" @click="goKeyWordArticle(a.id)">#{{ a.name }}</span> -->
                            <span class="dec-color">#{{ a.name }}</span>
                        </div>
                        <span class="summary">{{ articles.summary }}</span>
                        <div v-html="articles.content" class="text-item" v-if="
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
                                    <i class="collect"></i>
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

        <!-- <div class="article" v-if="article.article_type != 'magazine'">
            <ArticleFooter :article="article" />
        </div> -->

        <!-- <div class="magazine" v-if="article.article_type == 'magazine'">
            <span>订阅</span>
        </div> -->
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
                background-image: linear-gradient(0deg,
                        rgba(0, 0, 0, 0.6),
                        rgba(0, 0, 0, 0.1));

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
                        border-top: 2px solid #eee;

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