import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { IsEmail } from "class-validator"


@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    firstName:string

    @Column()
    lastName:string

    @Column()
    @IsEmail()
    email:string

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

}