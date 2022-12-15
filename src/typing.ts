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

export interface Catalogue {
    id:number,
    title:string,
    summary:string,
    display_time:string,
    article_type:string,
    cover_url:string,
    is_jurisdiction:boolean
}

export interface ArticleCollect {
    id:number,
    title:string,
    cover_url:string,
    authors_name:string,
    authors_pic:string,
    authors_id:number
}

export interface TopiceTop {
    id:number,
    name:string,
    topic_type:string,
    articles_count:number,
    summary:string,
    followers_count:number,
    has_latest_articles:boolean,
    updated_articles_count:number
}

export interface AuthorsTop {
    id:number,
    name:string,
    role:null,
    articles_count:number,
    introduction:string,
    followers_count:number,
    has_latest_articles:boolean,
    updated_articles_count:number,
    avatar:string
}

export interface CollectionList {
    id:number,
    title:string,
    summary:string,
    artcile_type:string,
    visit_times:number,
    like_times:number,
    share_url:string,
    article_info_url:string,
    read_time:8,
    diplay_time:string,
    comment_time:number,
    share_visit_limit:number,
    really_tags:any,
    favorite_times:number,
    share_visit_times:number,
    probation:boolean,
    word_times:number,
    cover_url:string,
    package_url:string,
    is_favorited:boolean,
    is_like:string,
    price:string,
    is_jurisdiction:boolean,
    authors:[{
        id:number,
        name:string,
        introduction:string,
        role:null,
        articles_count:number,
        avatar:string
    }],
    topics:[{
        id:number,
        name:string,
        topic_type:string,
        articles_count:number,
    }],
    votes:any,
    editor_choice_comments:any
}