import { IdName } from "src/common/interfaces/id-name.interface";

export interface RawArticle {
    id: number;
    title: string;
    content: string;
    author: IdName;
}