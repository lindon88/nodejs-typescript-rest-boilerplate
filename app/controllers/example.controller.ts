import ExampleHelper from "./helpers/example.helper";
import {Person} from "../models/Person";
import {Animal} from "../models/Animal";
import {Pet} from "../models/Pet";
import {PersonPet} from "../models/PersonPet";

import {getRepository} from "typeorm";
import {ApiOperationGet, ApiPath, SwaggerDefinitionConstant} from "swagger-express-ts";
import loggerConfig from "../config/logger.config";
import {Body, Delete, Get, JsonController, Param, Params, Post} from "routing-controllers";
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

    @Post("/example/person/update")
    public updatePerson(@Body({validate: true}) person: Person) {
        return this.validateObject(person).then((response) => {
            const res = this.exampleHelper.updatePerson(person);
            return {message: "Successfully updated person parameters"};
        }).catch((error) => {
            return {message: error};
        });
    }

    @Delete("/example/person/delete/:id")
    public deletePerson(@Param("id") id: number) {
        loggerConfig.register().debug("Request to delete person with ID - " + id);
        const deletePerson = this.exampleHelper.deletePerson(id);
        if (deletePerson) {
            return {message: "Successfully delete person"};
        } else {
            return {error: "Could not delete person"};
        }
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

    @Post("/example/animal/update")
    public updateAnimal(@Body({validate: true}) animal: Animal) {
        return this.validateObject(animal).then((response) => {
            const res = this.exampleHelper.updateAnimal(animal);
            return {message: "Successfully posted animal parameters"};
        }).catch((error) => {
            return {message: error};
        });
    }

    @Delete("/example/animal/delete/:id")
    public deleteAnimal(@Param("id") id: number) {
        loggerConfig.register().debug("Request to delete animal with ID - " + id);
        const deleteAnimal = this.exampleHelper.deleteAnimal(id);
        if (deleteAnimal) {
            return {message: "Successfully deleted animal"};
        } else {
            return {error: "Couldn't delete animal"};
        }
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

    @Post("/example/pet/update")
    public updatePet(@Body({validate: true}) pet: Pet) {
        return this.validateObject(pet).then((response) => {
            const res = this.exampleHelper.createPet(pet);
            return {message: "Successfully posted pet parameters"};
        }).catch((error) => {
            return {message: error};
        });
    }

    @Delete("/example/pet/delete/:id")
    public deletePet(@Param("id") id: number) {
        loggerConfig.register().debug("Request to delete pet with ID - " + id);
        const deletePet = this.exampleHelper.deletePet(id);
        if (deletePet) {
            return {message: "Successfully deleted pet"};
        } else {
            return {error: "Couldn't delete pet"};
        }
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

    @Post("/example/fellows/update")
    public updateFellowship(@Body({validate: true}) personPet: PersonPet) {
        return this.validateObject(personPet).then((response) => {
            const res = this.exampleHelper.updatePersonPet(personPet);
            return {message: "Successfully posted person-pet parameters"};
        }).catch((error) => {
            return {message: error};
        });
    }

    @Delete("/example/fellows/delete/:person_id/:pet_id")
    public deleteFellowship(@Param("person_id") person_id: number, @Param("pet_id") pet_id: number) {
        loggerConfig.register().debug("Request to end fellowship with personId - " + person_id + ", and petId: " + pet_id + ";");
        const deletePersonPet = this.exampleHelper.deletePersonPet(person_id, pet_id);
        if (deletePersonPet) {
            return {message: "Successfully deleted person-pet relationship"};
        } else {
            return {message: "Error occurred"};
        }
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
