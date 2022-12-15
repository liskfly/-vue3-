import axios from "axios";

export const Api = {
    HotSearch: () => {
      return axios.get(`http://api2021.cbnweek.com/v4/hotwords`)
    },
    getSearch: (keyword:string,type:string) => {
      return axios.get(`https://api2021.cbnweek.com/v4/pg_search_documents?page=1&per=20&query=${keyword}&query_type=${type}&type=android`)
    },
    getTypeSearch:(type:string) => {
      return axios.get(`http://api2021.cbnweek.com:80/v4/${type}?page=1&per=20&type=android`)
    }
  }