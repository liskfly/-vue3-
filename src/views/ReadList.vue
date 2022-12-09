<script setup lang="ts">
import { ref, onBeforeMount, toRefs, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Api } from "@/apis";
import type { banner, bannerType, bannerData } from "@/ReadPage";
import { Func } from "@/data/data";

const props = defineProps<{
  readType: string;
}>();
const route = useRoute();
const router = useRouter();
const readType = ref("");
const readList = ref<bannerData[]>([]);
const year = ref(2022);
const list = ref([]);
const loading = ref(false);
const finished = ref(false);
const yearArr = ref<number[]>([]);

const getDate = (date: string) => {
  return Func.getDate(date);
};

watch(props, (newValue) => {
  // readType = newValue.ReadList
  readList.value = [];
  year.value = 2021;
  readType.value = newValue.readType;
  getReadListFunc(year.value, readType.value);
  console.log(newValue.readType);
});

const goBookData = (id: number, type: string) => {
  if ((type == "Magazine")) {
    router.push({
      path: "/magazinedata",
      query: {
        id,
      },
    });
  } else if ((type == "Subject")) {
    router.push({
      path: "/subjectdata",
      query: {
        id,
      },
    });
  } else if ((type == "Theme")) {
    router.push({
      path: "/themedata",
      query: {
        id,
      },
    });
  }
};

const getReadListFunc = async (year: number, type: string) => {
  let { data } = await Api.getReadList(year, type);
  readList.value = [...readList.value, ...Func.deconstruction(data.data)];
  loading.value = false;
  if (year < 2009) {
    finished.value = true;
  }
  console.log(readList.value);
  console.log(readList.value);
};

const downLoad = (url:string) => {
  window.location.href = url
  // const url = window.location;
  console.log(url);
}

const onLoad = () => {
  year.value--;
  yearArr.value.push(year.value);
  console.log(yearArr.value);
  setTimeout(() => {
    getReadListFunc(year.value, readType.value);
  }, 1000);
};
</script>

<template>
  <div class="read-list">
    <van-list v-model:loading="loading" @load="onLoad" :finished="finished">
      <div class="ReadBook" v-for="(t, index) in yearArr" :key="index">
        <div class="year">
          <div class="line"></div>
          <span>{{ t }}年</span>
          <div class="line"></div>
        </div>
        <div class="book">
          <ul>
            <li v-for="(item, i) in readList" :key="i"
              :style="{ marginLeft: item.maga_year == t || parseInt(item.display_time) == t ? '4vw' : '' }"
              @click="goBookData(item.id, item.type)">
              <div class="book-list" v-if="item.maga_year == t || parseInt(item.display_time) == t">

                <div class="swipe-img">
                  <img v-lazy="item.cover_url" class="cover">
                  <div v-if="item.price" class="money">¥{{ item.price }}</div>
                  <a href="#" target="tempiframe" @click.stop="downLoad(item.package_path)">
                    <!-- :download="new Date().getTime()" -->
                    <img v-if="item.is_jurisdiction && item.package_path != 'https://files.cbnweek.com/'"
                      class="download" src="../assets/static/X-.png">
                  </a>
                  <iframe name="tempiframe" style="display:none;"></iframe>
                  <img src="../assets/static/4w.png" class="shadow">
                </div>
                <span class="title">{{ item.type == "Magazine" ? item.summary : item.name }}</span>
                <!-- <span class="time">{{ item.display_time.match(/\d+/g)[0] + '.' +
                    item.display_time.match(/\d+/g)[1] + '.' +
                    item.display_time.match(/\d+/g)[2]
                }}</span> -->
                <span class="time">{{ getDate(item.display_time) }}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </van-list>
  </div>
</template>

<style lang="scss" scoped>
.read-list {
  width: 100vw;

  .ReadBook {
    padding: 4vh 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-top: 1vh solid #f5f5f5;

    .fade-enter-active,
    .fade-leave-active {
      left: 0;
      // opacity: 1;
      transition: all 0.2s linear;
    }

    .fade-enter,
    .fade-leave-to {
      left: 100vw;
      // opacity: 0;
      transition: all 0.2s linear;
    }

    .year {
      display: flex;
      align-items: center;
      font-size: 15px;

      span {
        margin: 0 3vw;
      }

      .line {
        width: 6vw;
        border: 1px solid #a0a0a0;
      }
    }

    .book {
      width: 100vw;

      ul {
        width: 100vw;
        display: flex;
        flex-wrap: wrap;

        .book-list {
          display: flex;
          flex-direction: column;
          align-items: center;

          .swipe-img {
            width: 28vw;
            margin-top: 2vh;
            position: relative;

            .shadow {
              width: 14vw;
              height: 100%;
              position: absolute;
              border-radius: 5px 0 0 5px;
              top: 0;
              left: 0;
            }

            .cover {
              width: 28vw;
              border-radius: 5px;
            }

            .money {
              width: 12vw;
              height: 4vh;
              position: absolute;
              left: 0;
              top: 0;
              background-color: #c9ab79;
              border-radius: 0 20px 20px 0;
              text-align: center;
              color: white;
              line-height: 4vh;
            }

            .download {
              width: 5vw;
              height: 5vw;
              position: absolute;
              bottom: 1vh;
              right: 1vw;
            }
          }

          span {
            width: 28vw;
            margin-top: 1vh;
            white-space: nowrap;
            text-align: center;
            text-overflow: ellipsis;
            overflow: hidden;
          }

          .time {
            font-size: 12px;
          }

          .title {
            font-weight: 900;
          }
        }
      }
    }
  }
}
</style>