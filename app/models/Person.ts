import {Entity, Column, PrimaryGeneratedColumn, BaseEntity, Unique} from "typeorm";
import {ApiModel, ApiModelProperty} from "swagger-express-ts";
import {IsEmail, Length} from "class-validator";

/**
 * Person model
 * Describes person
 * Unique key: first_name, last_name
 */
@ApiModel({
    description: "Person model for example",
    name: "Person",
})
@Entity("persons")
@Unique("UQ_NAMES", ["first_name", "last_name"])
export class Person extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @ApiModelProperty({
        description: "Persons first name / should be unique with last_name",
        required: true,
    })
    @Column({type: "varchar"})
    public first_name: string;

    @ApiModelProperty({
        description: "Persons last name / should be unique with first_name",
        required: true,
    })
    @Column({type: "varchar"})
    public last_name: string;

    @ApiModelProperty({
        description: "Persons email",
        required: true,
    })
    @Column({type: "varchar"})
    public email: string;

    @ApiModelProperty({
        description: "Persons date of birth",
        required: true,
    })
    @Column({type: "date"})
    public birth_date: Date;

    @ApiModelProperty({
        description: "Persons gender",
        required: true,
    })
    @Column({type: "varchar"})
    public gender: string;

    @ApiModelProperty({
        description: "Current timestamp when creating person object",
        required: true,
    })
    @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    public created_at: string;

    @ApiModelProperty({
        description: "Current timestamp when updating person object",
        required: true,
    })
    @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    public update_at: string;
}
