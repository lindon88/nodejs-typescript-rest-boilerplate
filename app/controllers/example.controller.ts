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
import {BaseController} from "./base.controller";

@ApiPath({
    path: "/example",
    name: "Example",
})
@JsonController()
export class ExampleController extends BaseController {
    private exampleHelper: ExampleHelper;

    constructor() {
        super();
        this.exampleHelper = new ExampleHelper(getRepository(Person), getRepository(Animal), getRepository(Pet), getRepository(PersonPet));
    }

    @Post("/example/person/create")
    public createPerson(@Body({validate: true}) person: Person) {
        return this.validateObject(person).then((response) => {
            const res = this.exampleHelper.createPerson(person);
            return {message: "Successfully posted person parameters"};
        }).catch((error) => {
            return {message: error};
        });
    }

    @Get("/example/person/all")
    public getPersons() {
        const result = this.exampleHelper.getAllPersons();
        loggerConfig.register().debug("Requested all persons");
        return result;
    }

    @Get("/example/person/:id")
    public getPerson(@Param("id") person_id: number) {
        const result = this.exampleHelper.getPerson(person_id);
        loggerConfig.register().debug("Requested person by id: ", person_id);
        return result;
    }

    @Post("/example/animal/create")
    public createAnimal(@Body({validate: true}) animal: Animal) {
        return this.validateObject(animal).then((response) => {
            const res = this.exampleHelper.createAnimal(animal);
            return {message: "Successfully posted animal parameters"};
        }).catch((error) => {
            return {message: error};
        });
    }

    @Get("/example/animal/all")
    public getAnimals() {
        const result = this.exampleHelper.getAllAnimals();
        loggerConfig.register().debug("Requested all animals");
        return result;
    }

    @Get("/example/animal/:id")
    public getAnimalByID(@Param("id") animal_id: number) {
        const result = this.exampleHelper.getAnimal(animal_id);
        loggerConfig.register().debug("Request animal by id: ", animal_id);
        return result;
    }

    @Post("/example/pet/create")
    public createPet(@Body({validate: true}) pet: Pet) {
        return this.validateObject(pet).then((response) => {
            const res = this.exampleHelper.createPet(pet);
            return {message: "Successfully posted pet parameters"};
        }).catch((error) => {
            return {message: error};
        });
    }

    @Get("/example/pet/all")
    public getAllPets() {
        const results = this.exampleHelper.getAllPets();
        loggerConfig.register().debug("Requested all pets");
        return results;
    }

    @Get("/example/pet/:id")
    public getPetByID(@Param("id") pet_id: number) {
        const result = this.exampleHelper.getPet(pet_id);
        loggerConfig.register().debug("Requested pet by id: ", pet_id);
        return result;
    }

    @Post("/example/fellows/create")
    public createFellowship(@Body({validate: true}) personPet: PersonPet) {
        return this.validateObject(personPet).then((response) => {
            const res = this.exampleHelper.createPersonPet(personPet);
            return {message: "Successfully posted person-pet parameters"};
        }).catch((error) => {
            return {message: error};
        });
    }

    @Get("/example/fellows/all")
    public getAllFellows() {
        const result = this.exampleHelper.getAllPersonPet();
        loggerConfig.register().debug("Requested all person-pet models");
        return result;
    }

    @Get("/example/fellows/:id")
    public getFellowsByPerson(@Param("id") person_id: number) {
        const result = this.exampleHelper.getPersonPetsByPersonID(person_id);
        loggerConfig.register().debug("Requested person-pet objects by personId: ", person_id);
        return result;
    }
}
export default ExampleController;
