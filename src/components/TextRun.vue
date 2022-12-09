<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue"
import type { Article } from "../typing"
import { API } from "../apis/getData"

const animateUp = ref<boolean>(false)
const newsweek = ref<Article[]>([])
const textArr = ref<any>([])

const scrollAnimate = () => {
    animateUp.value = true;
    setTimeout(() => {
        textArr.value.push(textArr.value[0]);
        textArr.value.push(textArr.value[1]);
        textArr.value.push(textArr.value[2]);
        textArr.value.shift();
        textArr.value.shift();
        textArr.value.shift();
        animateUp.value = false;
    }, 1000);
}
const timer = () => {
    setInterval(scrollAnimate, 3000)
}

onMounted(async () => {
    let { data } = await API.getNewsWeek()
    newsweek.value = data.data[0].article
    newsweek.value.forEach(item => {
        textArr.value.push(item.summary)
    })
    timer()
})
</script>

<template>
    <div class="text-run">
        <div class="text-list" :class="{ animate: animateUp }">
            <p v-for="(t, i) in textArr" :key="i">
                {{ t }}
            </p>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.text-run {
    width: 70vw;
    height: 48px;
    overflow: hidden;

    .text-list {
        p {
            font-size: 13px;
            line-height: 16px;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
        }
    }

    .animate {
        transition: all .5s ease-in-out;
        transform: translateY(-48px);
    }
}
</style>