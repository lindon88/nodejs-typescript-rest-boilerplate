import {Entity, Column, PrimaryGeneratedColumn, BaseEntity, Unique, ManyToMany, JoinColumn, ManyToOne} from "typeorm";
import {ApiModel, ApiModelProperty} from "swagger-express-ts";
import {IsEmail, Length} from "class-validator";
import {Animal} from "./Animal";

@Entity("pets")
export class Pet extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @ManyToOne((type) => Animal)
    @JoinColumn({name: "id"})
    public animal: Animal;

    @Column({type: "varchar"})
    public species_name: string;

    @Column({type: "varchar"})
    public name: string;

    @Column({type: "integer"})
    public age: number;

    @ApiModelProperty({
        description: "Current timestamp when creating pets object",
        required: true,
    })
    @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    public created_at: string;

    @ApiModelProperty({
        description: "Current timestamp when updating pets object",
        required: true,
    })
    @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    public update_at: string;

}
