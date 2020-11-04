import { AuthorEntity } from "src/common/entities/author.entity";
import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Timestamp, Unique, UpdateDateColumn } from "typeorm";

export const TABLE_NAME = 'Articles';

@Entity({
    name: TABLE_NAME,
})
export class ArticleEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "nvarchar",
        length: 135,
        nullable: false,
    })
    title: string;

    @Column({
        type: 'text',
        nullable: false,
    })
    content: string;

    @Index({
        unique: true,
    })
    @Column()
    slug: string;

    @Index()
    @Column({
        default: true,
    })
    isActive: boolean;

    @Index()
    @Column({
        default: true,
    })
    isPublished: boolean;

    @ManyToOne(_ => AuthorEntity, author => author.id)
    @JoinColumn({
        name: 'authorId'
    })
    author: AuthorEntity; // TODO create Author entity in author module;
    
    @Index()
    @Column()
    authorId: number;


    @CreateDateColumn({
        type: 'timestamp',
    })
    createdOn: Timestamp;

    @UpdateDateColumn({
        type: 'timestamp',
    })
    modifiedOn: Timestamp;

}