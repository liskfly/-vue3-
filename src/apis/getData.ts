import axios from "axios"
// import type { BannersType } from "../typing"

export const API = {
    // 获取轮播图数据
    getBanner: () => {
        return axios.get('http://api2021.cbnweek.com/v4/banners?category=first')
    },

    // 获取音频周信息盒数据
    getNewsWeek: () => {
        return axios.get("http://api2021.cbnweek.com/v4/first_page_infos/audioNewsWeek")
    },

    // 获取主业主体数据
    getHome: () => {
        return axios.get("http://api2021.cbnweek.com/v4/first_page_infos?page=1")
    },

    // 获取音频路由轮播图
    getAudioBanner: () => {
        return axios.get("http://api2021.cbnweek.com/v4/audio_banners")
    },
    // 获取音频路由area
    getArea: () => {
        return axios.get("http://api2021.cbnweek.com/v4/audio/audio_index?page=1&per=20&year=2021")
    },
    // 获取音频路由popular
    getPopular: () => {
        return axios.get("http://api2021.cbnweek.com/v4/audio_series/visits?page=1&per=20&type=android")
    },

    // 文章详情
    getArticleData: (id: number) => {
        return axios.get(`http://api2021.cbnweek.com/v4/articles/${id}`)
    },
    // 文章推荐
    getArticleRecommend: (id: number) => {
        return axios.get(`http://api2021.cbnweek.com:80/v4/articles/${id}/recommendations`)
    },

    // 音频详情
    getAudioData: (id: any) => {
        return axios.get(`http://api2021.cbnweek.com:80/v4/articles/${id}`)
    },
    //文章目录
    getArticleCatalogue: (id:number) => {
        return axios.get(`https://api2021.cbnweek.com/v4/theme_subjects/theme_subject_article?article_id=${id}`)
    },

    getArticleCollections:(type:string,id:number) => {
        return axios.get(`http://api2021.cbnweek.com/v4/${type}/${id}/articles?page=1&per=20`)
    },

    getCollectionsTop:(type:string,id:number) => {
        return axios.get(`http://api2021.cbnweek.com/v4/${type}/${type == 'topics' ? `${id}`:type== 'columns' ? `${id}`:`${id}?id=${id}`}`)
    },
    // 音频专区
    getAudioSeries: (id: number) => {
        return axios.get(`http://api2021.cbnweek.com/v4/audio_series?id=${id}&type=AudioCourse&equipment=android`)
    },
    // 音频动态组件评论
    getComment: (id: number) => {
        return axios.get(`http://api2021.cbnweek.com:80/v4/articles/${id}/audio_comments?page=1&per=20&type=AudioArticle`)
    },
}