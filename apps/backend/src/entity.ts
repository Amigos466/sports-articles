import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, DeleteDateColumn } from "typeorm";

@Entity()
export class SportsArticle {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column()
    title!: string;

    @Column("text")
    content!: string;

    @Column({ nullable: true })
    imageUrl?: string;

    @CreateDateColumn()
    createdAt!: Date;

    @DeleteDateColumn()
    deletedAt?: Date;
}
