import { ref } from "vue"
import { defineStore } from 'pinia'
// import type { Subscribe } from "@/typing";

export const audioplay = defineStore('audio', () => {
    const audioData = ref<any>(JSON.parse(localStorage.getItem("articles") || '') || []);

    const cur = ref(0);
    const progress = ref(0);
    const totalTime = ref(0);
    const playAudio = ref(true);

    function changeStatus() {
        playAudio.value = !playAudio.value
    }

    function getTotalTime(time: any) {
        totalTime.value = time
    }

    function getCurr(time: number) {
        let timeInt = parseInt(time.toString())
        cur.value = timeInt
    }

    function changeLong(progress: number) {
        console.log(progress);
        console.log(totalTime.value);
        let cur = (progress * totalTime.value) / 100;
        getCurr(cur)
    }

    return { audioData, cur, progress, playAudio, getCurr, changeLong, getTotalTime, changeStatus }
})
