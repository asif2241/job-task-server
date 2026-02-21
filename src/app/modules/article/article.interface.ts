// article.interface.ts
export interface IArticle {
    article_id: string;      // API-র ইউনিক আইডি
    title: string;
    link: string;
    description?: string;
    content: string;
    pubDate: Date;
    image_url?: string;
    source_id: string;
    source_url?: string;
    source_icon?: string;
    creator?: string[];      // Author/Creator
    keywords?: string[];
    category: string[];
    country: string[];
    language: string;
    contentType?: 'News' | 'Blog' | 'Press Release' | 'Podcast'; // আপনার রিকোয়ারমেন্ট অনুযায়ী
}

export interface INewsFilters {
    startDate?: string;
    endDate?: string;
    author?: string;
    language?: string;
    country?: string;
    category?: string; // comma separated
    contentType?: IArticle["contentType"];
}