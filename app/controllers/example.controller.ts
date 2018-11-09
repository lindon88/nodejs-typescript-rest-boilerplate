import ExampleHelper from "./helpers/example.helper";
import {Person} from "../models/Person";
import {Animal} from "../models/Animal";
import {Pet} from "../models/Pet";
import {PersonPet} from "../models/PersonPet";

import {getRepository} from "typeorm";
import {ApiOperationGet, ApiPath, SwaggerDefinitionConstant} from "swagger-express-ts";
import loggerConfig from "../config/logger.config";
import {Body, Get, JsonController, Param, Post} from "routing-controllers";
import {validate} from "class-validator";

@ApiPath({
    path: "/example",
    name: "Example",
})
@JsonController()
export class ExampleController {
    private exampleHelper: ExampleHelper;

    constructor() {
        this.exampleHelper = new ExampleHelper(getRepository(Person), getRepository(Animal), getRepository(Pet), getRepository(PersonPet));
    }

    @Post("/example/person/create")
    public createPerson(@Body({validate: true}) person: Person) {
        return new Promise((resolve, reject) => {
            resolve(validate(person).then((errors) => {
                if (errors.length > 0) {
                    return errors;
                } else {
                    const res = this.exampleHelper.createPerson(person);
                    return {message: "Successfully posted person parameters"};
                }
            }));
        });
    }

    @Post("/example/animal/create")
    public createAnimal(@Body({validate: true}) animal: Animal) {
        return new Promise((resolve, reject) => {
            resolve(validate(animal).then((errors) => {
                if (errors.length > 0) {
                    return errors;
                } else {
                    // call helper
                    const res = this.exampleHelper.createAnimal(animal);
                    return {message: "Successfully posted animal parameters"};
                }
            }));
        });
    }

    @Post("/example/pet/create")
    public createPet(@Body({validate: true}) pet: Pet) {
        return new Promise((resolve, reject) => {
            resolve(validate(pet).then((errors) => {
                if (errors.length > 0) {
                    return errors;
                } else {
                    // call helper
                    const res = this.exampleHelper.createPet(pet);
                    return {message: "Successfully posted pet parameters"};
                }
            }));
        });
    }

    @Post("/example/fellows/create")
    public createFellowship(@Body({validate: true}) personPet: PersonPet) {
        return new Promise((resolve, reject) => {
            resolve(validate(personPet).then((errors) => {
                if (errors.length > 0) {
                    return errors;
                } else {
                    // call helper
                    const res = this.exampleHelper.createPersonPet(personPet);
                    return {message: "Successfully posted pet parameters"};
                }
            }));
        });
    }
}
export default ExampleController;
