import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthorEntity } from './common/entities/author.entity';
import { ArticleModule } from './modules/article/article.module';
import { ArticleEntity } from './modules/article/entities/article.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: 'localhost',
      port: 3306,
      username: 'blog-user',
      password: 'bloguserpass',
      database: 'blog',
      entities: [
        ArticleEntity,
        AuthorEntity
      ],
      logger: 'advanced-console',
      logging: 'all',
      synchronize: true,
    }),
    ArticleModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
