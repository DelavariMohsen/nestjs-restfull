import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// TODO add some fields!
@Entity({
    name: 'Authors'
})
export class AuthorEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'nvarchar',
        length: 135,
    })
    name: string;
}