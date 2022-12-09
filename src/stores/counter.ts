import { ref } from "vue"
import { defineStore } from 'pinia'
import type { Subscribe } from "@/ReadPage";
import { Func } from "@/data/data";

export const deconstruction = defineStore('counter', () => {
  const locatSubscribe = ref<Subscribe[]>(JSON.parse(localStorage.getItem("subscribe") || '0') || []);
  function saveSubscribe (id: number, type: string, url: string, title: string):void {
    let num = locatSubscribe.value.findIndex((item) => {
      return item.id == id
    })
    if (num == -1) {
      locatSubscribe.value.unshift({ id, type, url, title })
      window.localStorage.setItem('subscribe', JSON.stringify(locatSubscribe.value))
    } else {
      locatSubscribe.value = locatSubscribe.value.filter(item => item.id != id)
      window.localStorage.setItem('subscribe', JSON.stringify(locatSubscribe.value))
    }
  }

  return { saveSubscribe ,locatSubscribe }
})
