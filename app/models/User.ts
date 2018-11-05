import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({type: 'varchar'})
    username!: string;

    @Column({type: 'varchar'})
    email!: string;

    @Column({type: 'varchar'})
    first_name!: string;

    @Column({type: 'varchar'})
    last_name!: string;
}