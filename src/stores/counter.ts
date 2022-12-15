import { ref } from "vue"
import { defineStore } from 'pinia'
import type { Subscribe } from "@/ReadPage";
import type { ArticleCollect } from "@/typing";
import { showToast } from "vant";

export const deconstruction = defineStore('counter', () => {
  const locatSubscribe = ref<Subscribe[]>(JSON.parse(localStorage.getItem("subscribe") || '0') || []);
  function saveSubscribe(id: number, type: string, url: string, title: string): void {
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

  return { saveSubscribe, locatSubscribe }
})

export const ArticleCollection = defineStore('ArticleCollection', () => {
  const locatCollection = ref<ArticleCollect[]>(JSON.parse(localStorage.getItem("ArticleCollection") || '0') || []);
  function saveArticle(data: ArticleCollect): void {
    let num = locatCollection.value.findIndex((item) => {
      return item.id == data.id
    })
    if (num == -1) {
      locatCollection.value.unshift(data)
      window.localStorage.setItem('ArticleCollection', JSON.stringify(locatCollection.value))
    } else {
      locatCollection.value = locatCollection.value.filter(item => item.id != data.id)
      window.localStorage.setItem('ArticleCollection', JSON.stringify(locatCollection.value))
    }
  }
  const lightAndFont = ref<{fontSize:number,isLight:boolean,lineHeight:number}>(JSON.parse(localStorage.getItem("lightAndFont") || '0'));
  function SaveStyle(data:{fontSize:number,isLight:boolean,lineHeight:number}) {
    lightAndFont.value = data
    window.localStorage.setItem('lightAndFont', JSON.stringify(lightAndFont.value))
  }
  function changeLight():boolean {
    lightAndFont.value.isLight = !lightAndFont.value.isLight
    window.localStorage.setItem('lightAndFont', JSON.stringify(lightAndFont.value))
    return !lightAndFont.value.isLight
  }
  return { locatCollection, saveArticle, lightAndFont, SaveStyle, changeLight}
})

export const SearchHistory = defineStore('history', () => {
  const locatSearch = ref<string[]>(JSON.parse(localStorage.getItem("search") || '0') || []);
  function addSearch(str: string): void {
    let num = locatSearch.value.findIndex((item) => {
      return item == str
    })
    if (num == -1) {
      locatSearch.value.push(str)
      window.localStorage.setItem('search', JSON.stringify(locatSearch.value))
    }
  }
  function reduceSearch(str: string): void {
    console.log(1);

    locatSearch.value = locatSearch.value.filter(item => item != str) || []
    window.localStorage.setItem('search', JSON.stringify(locatSearch.value))
  }
  function allReduceSearch(): void {
    locatSearch.value = []
    window.localStorage.setItem('search', JSON.stringify(locatSearch.value))
  }

  return { addSearch, locatSearch, allReduceSearch, reduceSearch }
})

export const CollectionFollow = defineStore('follow', () => {
  const locatFollow = ref<{id:number,type:string,name:string}[]>(JSON.parse(localStorage.getItem("follow") || '0') || []);
  function addFollow(data:{id:number,type:string,name:string}): void {
    let num = locatFollow.value.findIndex((item) => {
      return item.id == data.id
    })
    if (num == -1) {
      locatFollow.value.unshift(data)
      window.localStorage.setItem('follow', JSON.stringify(locatFollow.value))
    } else {
      locatFollow.value = locatFollow.value.filter(item => item.id != data.id)
      window.localStorage.setItem('follow', JSON.stringify(locatFollow.value))
    }
  }
  function checkFollow(id:number):boolean {
    let num = locatFollow.value.findIndex((item) => {
      return item.id == id
    })
    if(num == -1) {
      return false
    }else {
      return true
    }
  }
  return { locatFollow, addFollow, checkFollow }
})

export const WayForLogin = defineStore('login',() => {
  const userData = ref<{passWord:string,userName:string}[]>(JSON.parse(localStorage.getItem("token") || '0') || []);
  const userToken = ref<{passWord:string,userName:string}>(JSON.parse(sessionStorage.getItem("token") || '0') || {})
  function finishLogon(data:{passWord:string,userName:string}):void {
    let num = userData.value.findIndex((item) => {
      return item.userName == data.userName;
    })
    if(num == -1) {
      userData.value.push(data)
      window.localStorage.setItem(
        "token",
        JSON.stringify(userData.value)
      );
      showToast('注册成功')
    }else {
      showToast('已有相同用户名注册')
    }
  }
  function finishLogin(data:{passWord:string,userName:string}): void {
    let obj:string = ''
    let num = userData.value.findIndex((item) => {
      if(item.userName == data.userName) {
        obj = item.passWord
        return true
      }
    })
    if(num == -1) {
      showToast('该用户未注册')
    }else {
      if(obj == data.passWord){
        userToken.value = data
        window.sessionStorage.setItem('token', JSON.stringify(userToken.value))
        showToast('登录成功')
      } else {
        showToast('密码错误')
      }
    }
  }
  return {userData , finishLogin , finishLogon , userToken}
})