import { IdName } from "src/common/interfaces/id-name.interface";

export interface PagedArticle {
    id: number;
    title: string;
    author: IdName;
    lightContent: string;
}