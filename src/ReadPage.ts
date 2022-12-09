export interface bannerData {
    type:string,
    id:number,
    summary:string,
    maga_year:number,
    maga_month:number,
    maga_day:number,
    maga_year_number:number,
    maga_all_number:number,
    package_path:string,
    display_time:string,
    articles_count:number,
    listing_name:string,
    name:string,
    pdf_url:string,
    cover_url:string,
    cover_gif_url:string,
    is_jurisdiction:boolean,
    price:number|null,
}

export interface bannerType {
    month:string,
    data:Array<bannerData>
}

export interface banner {
    data:Array<bannerType>
}

export interface magazineData {
    magazine_id:number,
    magazine_name:string,
    magazine_summary:string,
    magazine_cover_url:string,
    magazine_all_number:number,
    column_id:number,
    column_name:string,
    column_summary:string,
    column_icon:string,
    column_default_mini_icon:string,
    column_selected_mini_icon:string,
    articles:Array<magaArticles>
}

export interface magaArticles {
    id:number,
    title:string,
    summary:string,
    cover_url:string,
    column_id:number,
    column_name:string,
    column_icon:any,
    column_default_mini_icon:any,
    column_selected_mini_icon:any,
    authors:Array<MagaAuthors>,
    display_time:string,
    read_time:number,
    like_times:number,
    comment_times:number,
    is_favorited:boolean,
    is_like:false,
    is_jurisdiction:boolean
}

export interface MagaAuthors {
    id:number,
    name:string,
    avatar:string
}

export interface themeData {
    id:number,
    name:string,
    published_articles_count:number,
    package_path:string,
    cover_url:string,
    display_time:string,
    articles_count:number,
    description:any,
    illustration:string,
    is_jurisdiction:boolean,
    authors:Array<themeauthors>,
    articles:Array<themeArticles>
}

export interface themeauthors {
    id:number,
    name:string,
    role:any,
    articles_count:number,
    avatar:string
}

export interface themeArticles {
    id:number,
    title:string,
    summary:string,
    read_time:number,
    display_time:string,
    word_times:number,
    cover_url:string
}

export interface Subscribe {
    id:number,
    url:string,
    title:string,
    type:string
}

export interface Subject {
    id:number,
    name:string,
    summary:string,
    price_id:number,
    vip_price_id:number,
    description:string,
    subscibe_knowledge:string,
    keywords:any,
    share_url:string,
    package_path:string,
    articles_count:number,
    display_time:string,
    price:number,
    vip_price:number,
    cover_url:string,
    background_url:string,
    is_jurisdiction:boolean,
    authors:Array<SubjectAuthors>,
    articles:Array<SubjectArticles>,
}

export interface SubjectAuthors {
    id:number,
    name:string,
    role:null,
    introduction:string,
    avatar:string
}

export interface SubjectArticles {
    id:number,
    title:string,
    summary:string,
    read_time:number,
    display_time:string,
    word_times:number
}