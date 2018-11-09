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
import {IsDate, IsEmail, Length} from "class-validator";
import {Person} from "./Person";
import {Pet} from "./Pet";

@ApiModel({
    description: "PersonPet model",
    name: "PersonPet",
})
@Entity("person_pet")
export class PersonPet extends BaseEntity {
    @ApiModelProperty({
        description: "person id",
        required: true,
    })
    @PrimaryColumn()
    public person_id: number;

    @ApiModelProperty({
        description: "foreign key on person",
    })
    @ManyToOne(() => Person)
    @JoinColumn({name: "person_id"})
    public person: Person;

    @ApiModelProperty({
        description: "pet id",
        required: true,
    })
    @PrimaryColumn()
    public pet_id: number;

    @ApiModelProperty({
        description: "foreign key on pet",
    })
    @ManyToOne(() => Pet)
    @JoinColumn({name: "pet_id"})
    public pet: Pet;

    @ApiModelProperty({
        description: "Started Fellowship date",
        required: true,
    })
    @Column({type: "date"})
    public started_fellowship: Date;

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
