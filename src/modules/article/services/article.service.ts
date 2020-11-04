import { Injectable, NotFoundException } from '@nestjs/common';
import { ResponseResult } from 'src/common/dto/response-result';
import { PagedQueryModel } from 'src/common/interfaces/paged-query-model.dto';
import { ArticleRepository } from '../repositories/article-repository';
import { norimalizePagedQueryModel } from 'src/helpers/functions';
import { PagedArticle } from '../interfaces/paged-article.interface';
import { RawArticle } from '../interfaces/raw-article.interface';
import { AddArticleDto } from '../dto/add-article.dto';
import { EditArticleDto } from '../dto/edit-article.dto';
import { ArticleEntity } from '../entities/article.entity';

@Injectable()
export class ArticleService {
    async editArticle(id: number, article: EditArticleDto): Promise<ResponseResult<RawArticle>> {
        const art = await this.articles.findById(id);
        if (!art) {
            return ResponseResult.error(
                new NotFoundException(`Article ${id} not found!`),
            );
        }
        this.mapDtoToEntity(article, art);
        await this.articles.save(art);
        return await this.getArticle(id);
    }

    private mapDtoToEntity(dto: EditArticleDto, entity: ArticleEntity) {
        for (const dtoKey in dto) {
            if (Object.prototype.hasOwnProperty.call(dto, dtoKey)
                && entity[dtoKey] != dto[dtoKey]) {
                entity[dtoKey] = dto[dtoKey];

            }
        }
    }

    async addArticle(article: AddArticleDto): Promise<ResponseResult<RawArticle>> {
        const author = {
            id: 1,
            name: 'mohsen',
        };
        // TODO authorRes = await authorService.getAuthor(article.author.id);
        // TOTO if (authorRes.error) {
        //          return ResponseResult(authorRes.error);
        //}
        const ar = this.articles.create({
            title: article.title,
            content: article.content,
            slug: article.title + (Math.floor(Math.random() * 10000)), // TODO generate uniqe slug
            author: author,
        });
        console.log(article);

        await this.articles.save(ar);
        return await this.getArticle(ar.id);
    }
    async getArticle(articleId: number): Promise<ResponseResult<RawArticle>> {
        const article = await this.articles.findOne({
            where: {
                id: articleId,
            },
            relations: ['author']
        });
        if (!article) {
            return ResponseResult.error(
                new NotFoundException(`Article ${articleId} not found!`),
            );
        }
        return ResponseResult.success({
            id: article.id,
            title: article.title,
            content: article.content,
            author: {
                id: article.author.id,
                name: article.author.name,
            }
        } as RawArticle);
    }

    async getPagedArticles(queryModel: PagedQueryModel): Promise<ResponseResult<PagedArticle>> {
        queryModel = norimalizePagedQueryModel(queryModel);
        const res = await this.articles.getPagedArticles(queryModel)
        return new ResponseResult({
            data: res.items,
            totalItems: res.totalItems,
        });
    }


    constructor(
        private readonly articles: ArticleRepository
    ) {

    }
}
