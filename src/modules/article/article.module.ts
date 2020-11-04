import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorEntity } from 'src/common/entities/author.entity';
import { ArticleController } from './controllers/article.controller';
import { ArticleEntity } from './entities/article.entity';
import { ArticleRepository } from './repositories/article-repository';
import { ArticleService } from './services/article.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ArticleRepository,
            // AuthorEntity,
        ])
    ],
    controllers: [
        ArticleController,
    ],
    providers: [
        ArticleService,
    ],
    exports: [
        TypeOrmModule
    ],
})
export class ArticleModule {}
