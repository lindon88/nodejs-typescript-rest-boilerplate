import {Entity, Column, PrimaryGeneratedColumn, BaseEntity} from "typeorm";
import {ApiModel, ApiModelProperty} from "swagger-express-ts";
import {IsEmail, Length} from "class-validator";

/**
 * User model
 */
@ApiModel({
    description: "Users description",
    name: "User",
})
@Entity("users")
export class User extends BaseEntity {
    @ApiModelProperty({
        description: "User id",
        required: true,
    })
    @PrimaryGeneratedColumn()
    public id: number;

    @ApiModelProperty({
        description: "Users username",
        required: true,
    })
    @Length(5, 15)
    @Column({type: "varchar"})
    public username: string;

    @ApiModelProperty({
        description: "Users email",
        required: true,
    })
    @Column({type: "varchar"})
    @IsEmail()
    public email: string;

    @ApiModelProperty({
        description: "Users first name",
        required: true,
    })
    @Column({type: "varchar"})
    @Length(3, 20)
    public first_name: string;

    @ApiModelProperty({
        description: "Users last name",
        required: true,
    })
    @Column({type: "varchar"})
    @Length(3, 20)
    public last_name: string;
}
