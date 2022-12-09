import http from "@/http";
import type { banner } from "@/ReadPage"
import axios from "axios";

export const Api = {
    getReadBanner: (url:string) => {
      return http.request<banner>({
        url: url,
        method: 'get'
      })
    },
    getReadList: (year:number,type:string|null) => {
      return axios.get(`http://api2021.cbnweek.com/v4/magazines?year=${year}&type=${type}`)
    },
    getChoiceList:(type:string,year:number|null,month:number|null) => {
      return axios.get(`http://api2021.cbnweek.com/v4/magazines?year=${year}&month=${month}&type=${type}`)
    },
    getBookDataList:(type:string,id:number,suffix:string) => {
      return axios.get(`https://api2021.cbnweek.com/v4/${type}/${id}${suffix}`)
    }
  }