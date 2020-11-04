import { PagedResult } from "src/common/dto/paged-response";
import { PagedQueryModel } from "src/common/interfaces/paged-query-model.dto";
import { EntityRepository, Repository } from "typeorm";
import { ArticleEntity, TABLE_NAME } from "../entities/article.entity";
import { PagedArticle } from "../interfaces/paged-article.interface";

@EntityRepository(ArticleEntity)
export class ArticleRepository extends Repository<ArticleEntity> {
    async findById(id: number, loadAuthor = true): Promise<ArticleEntity> {
        return await this.findOne({
            where: {
                id,
            },
            relations: loadAuthor ? ['author'] : [],
        });
    }

    async getPagedArticles(queryModel: PagedQueryModel): Promise<PagedResult<PagedArticle>> {
        let query = this.createQueryBuilder(TABLE_NAME)
            .where(`${TABLE_NAME}.isPublished = :isPublished`, { isPublished: true })
            .andWhere(`${TABLE_NAME}.isActive = :isActive`, { isActive: true });

        if (queryModel.term) {
            query = query.andWhere(`${TABLE_NAME}.title like :term`, { term: `%${queryModel.term}%` })
        }

        const countQuery = query.clone();

        query = query
            .select([
                `${TABLE_NAME}.id`,
                `${TABLE_NAME}.title`,
                `${TABLE_NAME}.content`,
            ])
            .leftJoinAndMapOne(`${TABLE_NAME}.author`, 'Authors', 'authors', `authors.id = ${TABLE_NAME}.authorId`);

        const [items, totalItems] = await Promise.all([
            query
                .orderBy(`${TABLE_NAME}.${queryModel.sortBy}`, queryModel.isAsc ? 'ASC' : 'DESC')
                .skip((queryModel.page - 1) * queryModel.limit)
                .take(queryModel.limit)
                .getMany(),
            countQuery.getCount()
        ]);

        return {
            totalItems,
            items: items.map(ar => ({
                id: ar.id,
                title: ar.title,
                lightContent: ar.content,
                author: {
                    id: ar.author.id,
                    name: ar.author.name,
                }
            } as PagedArticle))
        }
    }
}