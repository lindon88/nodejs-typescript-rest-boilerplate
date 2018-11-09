import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    Unique,
    ManyToMany,
    JoinColumn,
    ManyToOne,
    PrimaryColumn,
} from "typeorm";
import {ApiModel, ApiModelProperty} from "swagger-express-ts";
import {IsEmail, IsNumber, Length, MaxLength} from "class-validator";
import {Animal} from "./Animal";

/**
 * Pet model
 * References table animal for animal type
 */
@ApiModel({
    description: "Pets model",
    name: "Pet",
})
@Entity("pets")
export class Pet extends BaseEntity {
    @ApiModelProperty({
        description: "Pet ID",
    })
    @PrimaryGeneratedColumn()
    public id: number;

    @ApiModelProperty({
        description: "animal id",
        required: true,
    })
    @Column()
    public animal_id: number;

    @ApiModelProperty({
        description: "Animal foreign key",
        required: true,
    })
    @ManyToMany((type) => Animal, { cascade: false })
    @JoinColumn({name: "animal_id"})
    public animal: Animal;

    @MaxLength(20)
    @ApiModelProperty({
        description: "Pet name",
        required: true,
    })
    @Column({type: "varchar"})
    public name: string;

    @IsNumber()
    @ApiModelProperty({
        description: "Pet age",
        required: true,
    })
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
