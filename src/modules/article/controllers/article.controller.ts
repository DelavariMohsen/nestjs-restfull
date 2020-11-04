import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { INIT_PAGED_QUERY, PagedQueryModel } from 'src/common/interfaces/paged-query-model.dto';
import { ResponseResult } from 'src/common/dto/response-result';
import { appSettings } from 'src/helpers/constants';
import { PagedArticle } from '../interfaces/paged-article.interface';
import { ArticleService } from '../services/article.service';
import { RawArticle } from '../interfaces/raw-article.interface';
import { AddArticleDto } from '../dto/add-article.dto';
import { EditArticleDto } from '../dto/edit-article.dto';

const API_NAME = 'article';

@Controller(`${appSettings.api.API_V1_BASE_URL}/${API_NAME}`)
export class ArticleController {

    @Get()
    async getArticles(
        @Query() queryModel: PagedQueryModel = INIT_PAGED_QUERY
    ): Promise<ResponseResult<PagedArticle>> {
        return await this.articleService.getPagedArticles(queryModel);
    }

    @Get(':id')
    async getArticle(
        @Param('id') articleId: number
    ): Promise<ResponseResult<RawArticle>> {

        const res = await this.articleService.getArticle(articleId);
        if (res.error) {
            throw res.error;
        }

        return res;
    }

    @Post()
    async addArticle(
        @Body() article: AddArticleDto
    ): Promise<ResponseResult<RawArticle>> {
        const res = await this.articleService.addArticle(article);
        if (res.error) {
            throw res.error;
        }
        return res;
    }

    @Put(':id')
    async editArticle(
        @Param('id') id: number,
        @Body() article: EditArticleDto
    ): Promise<ResponseResult<RawArticle>> {
        const res = await this.articleService.editArticle(id, article);
        if (res.error) {
            throw res.error;
        }
        return res;
    }

    constructor(
        private readonly articleService: ArticleService
    ) {

    }
}
