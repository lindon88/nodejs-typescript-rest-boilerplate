import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";
import {ApiModel, ApiModelProperty} from "swagger-express-ts";

@ApiModel({
    description: "Users description",
    name: "User",
})
@Entity("users")
export class User {
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
    @Column({type: "varchar"})
    public username: string;

    @ApiModelProperty({
        description: "Users email",
        required: true,
    })
    @Column({type: "varchar"})
    public email: string;

    @ApiModelProperty({
        description: "Users first name",
        required: true,
    })
    @Column({type: "varchar"})
    public first_name: string;

    @ApiModelProperty({
        description: "Users last name",
        required: true,
    })
    @Column({type: "varchar"})
    public last_name: string;
}
