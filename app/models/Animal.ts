import {Entity, Column, PrimaryGeneratedColumn, BaseEntity, Unique} from "typeorm";
import {ApiModel, ApiModelProperty} from "swagger-express-ts";
import {IsEmail, Length, MaxLength} from "class-validator";

@ApiModel({
    description: "Animal model for determining type of pet",
    name: "Animal",
})
@Entity("animals")
@Unique(["name"])
export class Animal extends BaseEntity {
    @ApiModelProperty({
        description: "Animal ID",
    })
    @PrimaryGeneratedColumn()
    public id: number;

    @MaxLength(20)
    @ApiModelProperty({
        description: "Animal type name",
        required: true,
    })
    @Column({type: "varchar"})
    public name: string;
}
