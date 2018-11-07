import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

/**
 * @tsoaModel
 */
@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({type: "varchar"})
    public username: string;

    @Column({type: "varchar"})
    public email: string;

    @Column({type: "varchar"})
    public first_name: string;

    @Column({type: "varchar"})
    public last_name: string;
}
