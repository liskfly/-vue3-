export interface BannersType {
    bannerable_id: number,
    cover_url: string
}

export interface Article {
    summary: string
}

export interface Magazine {
    name: string
}

export interface Info {
    id: number,
    title: string,
    display_time: string,
    read_time: number,
    word_times: number,
    cover_url: string,
    visit_times: number,
    like_times: number,
    comment_times: number,
    article_type: string,
    magazine: Magazine
}

export interface Area {
    audio_type: string,
    id: number,
    cover_url: string,
    name: string,
    visit_times: number,
    summary: string
}

export interface Popular {
    cover_url: string,
    id: number,
    title: string,
    summary: string,
    visit_times: number,
    audio_duration: number
}

export interface ArticleContent {
    cover_url: string,
    title: string,
    visit_times: number,
    favorite_times: number,
    authors: [{
        name: string,
        avatar: string
    }],
    read_time: number,
    word_times: number,
    display_time: string,
    article_type: string,
    topics: [{
        id: number,
        name: string
    }],
    summary:string,
    content:string,
    probation:boolean
}

export interface ArticleRecommend{
    cover_url:string,
    title:string
}

export interface AudioDetail{
    title:string,
    audio_title:string,
    display_time:string,
    content:string,
    favorite_times:number
}