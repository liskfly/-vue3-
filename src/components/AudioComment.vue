<script setup lang="ts">
import type { Comment } from "../typing"
import { API } from "../apis/getData"
import { getAllDate } from '../utils/index'
import { defineProps, ref, toRefs, onMounted } from 'vue'

const props = defineProps({
  seriesId: Number
});
const { seriesId } = toRefs(props)
const id: any = seriesId

const comment = ref<Comment[]>([])
onMounted(async () => {
  let { data } = await API.getComment(id.value)
  console.log(data);
  comment.value = data.data
})

</script>

<template>
  <div class="comment">
    <div class="comment-box" v-for="c in comment" :key="c.id">
      <div class="comment-user">
        <img :src="c.user.avatar" alt="tx" />
        <div class="comment-user-dec">
          <span class="comment-user-name">{{ c.user.nickname }}</span>
          <span class="comment-time">{{ getAllDate(c.display_time) }}</span>
          <!-- <span class="comment-time">{{ (c.display_time) }}</span> -->
        </div>
      </div>
      <div class="comment-text">{{ c.content }}</div>
      <div class="comment-like">
        <span>{{ c.like_times }} </span><i></i>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.comment {
  margin-bottom: 50px;

  .comment-box {
    padding: 10px 0;
    display: flex;
    flex-direction: column;
    border-bottom: 2px solid #eee;

    .comment-user {
      display: flex;
      gap: 10px;
      align-items: center;

      img {
        border-radius: 999px;
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
      margin: 10px 0;
      padding: 5px;
      border-radius: 5px;
      font-size: 14px;
      line-height: 18px;
      background-color: #eee;
    }

    .comment-like {
      display: flex;
      justify-content: flex-end;

      span {
        font-size: 12px;
        color: #888;
      }

      i {
        display: block;
        margin-left: 20px;
        width: 14px;
        height: 14px;
        background-image: url(@/assets/img/gQ.png);
        background-size: 100% 100%;
        background-repeat: no-repeat;
      }
    }
  }
}
</style>