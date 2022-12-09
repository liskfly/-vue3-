<script setup lang="ts">
import TextRun from "../components/TextRun.vue"
</script>

<template>
    <div class="news">
        <div class="choose-time">
            <div class="time">
                <span class="time-date">1</span>
                <span class="time-mon">Dec.2022</span>
                <div class="calendar">
                    <img src="@/assets/img/3w.png" alt="calendar">
                </div>
            </div>
            <div class="audio-img"></div>
        </div>

        <div class="news-box">
            <div class="new-img">
                <img src="../assets/img/newsWeek.png" alt="头条" />
            </div>
            <div class="news-textbox">
                <TextRun></TextRun>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.news {
    margin: 0 3vw;

    .choose-time {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 40px;

        .time {
            display: flex;
            align-items: flex-end;

            .time-date {
                margin-right: 8px;
                font-size: 22px;
                font-weight: bolder;
            }

            .time-mon {
                margin-right: 6px;
                font-size: 12px;
                color: #666;
            }

            .calendar {
                position: relative;

                img {
                    width: 16px;
                    height: 16px;
                }

                .date {
                    position: absolute;
                    top: 24px;
                    left: 0;
                    border: 2px solid #eee;
                    width: 120px;
                    background-color: #fff;
                    z-index: 1;
                    font-size: 13px;

                    .date-text {
                        padding: 8px 6px;
                    }
                }
            }
        }

        .audio-img {
            width: 16px;
            height: 16px;
            background-image: url(@/assets/img/FM.png);
            background-size: contain;
        }

        .playmg {
            background-image: url(@/assets/img/gX.png);
        }
    }

    .news-box {
        display: flex;
        justify-content: space-between;
        border: 1px solid #eee;
        box-shadow: 1px 1px 3px #eee;
        border-radius: 5px;
        width: 100%;
        height: 76px;
        padding: 12px 12px;

        .new-img {
            width: 50px;
            height: 50px;
            border-radius: 5px;
            overflow: hidden;

            img {
                width: 100%;
            }
        }
    }
}
</style>