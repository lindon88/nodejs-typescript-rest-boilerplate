import ExampleHelper from "./helpers/example.helper";
import {Person} from "../models/Person";
import {Animal} from "../models/Animal";
import {Pet} from "../models/Pet";
import {PersonPet} from "../models/PersonPet";

import {getRepository} from "typeorm";
import {
    ApiOperationDelete,
    ApiOperationGet,
    ApiOperationPost,
    ApiPath,
    SwaggerDefinitionConstant,
} from "swagger-express-ts";
import loggerConfig from "../config/logger.config";
import {Body, Delete, Get, JsonController, Param, Params, Post} from "routing-controllers";
import {validate} from "class-validator";
import {BaseController} from "./base.controller";

/**
 * Showcase controller
 * CRUD examples
 * Using two or more tables with joins
 */
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

    /**
     * Creates new person
     * @param person
     */
    @ApiOperationPost({
        path: "/person/create",
        description: "Create person",
        summary: "Create new person",
        parameters: {
            body: { description: "new person", required: true, model: "Person"},
        },
        responses: {
            200: { description: "Success" },
            400: { description: "Parameters fail" },
        },
    })
    @Post("/example/person/create")
    public createPerson(@Body({validate: true}) person: Person) {
        return this.validateObject(person).then((response) => {
            const res = this.exampleHelper.createPerson(person);
            return {message: "Successfully posted person parameters"};
        }).catch((error) => {
            return {message: error};
        });
    }

    /**
     * Updates existing person
     * @param person
     */
    @ApiOperationPost({
        path: "/person/update",
        description: "Update person",
        summary: "Update existing person",
        parameters: {
            body: { description: "update person", required: true, model: "Person"},
        },
        responses: {
            200: { description: "Success" },
            400: { description: "Parameters fail" },
        },
    })
    @Post("/example/person/update")
    public updatePerson(@Body({validate: true}) person: Person) {
        return this.validateObject(person).then((response) => {
            const res = this.exampleHelper.updatePerson(person);
            return {message: "Successfully updated person parameters"};
        }).catch((error) => {
            return {message: error};
        });
    }

    /**
     * Deletes existing person
     * @param id
     */
    @ApiOperationDelete({
        path: "/person/delete/{id}",
        parameters: {
            path: {
                id: {
                    description: "Id of person",
                    type: SwaggerDefinitionConstant.Parameter.Type.INTEGER,
                    required: true,
                },
            },
        },
        responses: {
            200: { description: "Success" },
        },
    })
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

    /**
     * @returns all persons from database
     */
    @ApiOperationGet({
        path: "/person/all",
        description: "Get all persons",
        summary: "Get persons request",
        responses: {
            200: {
                description: "Success", type: SwaggerDefinitionConstant.Response.Type.ARRAY, model: "Person",
            },
        },
    })
    @Get("/example/person/all")
    public getPersons() {
        const result = this.exampleHelper.getAllPersons();
        loggerConfig.register().debug("Requested all persons");
        return result;
    }

    /**
     * @returns specific person from database
     * @param person_id
     */
    @ApiOperationGet({
        path: "/person/{id}",
        description: "Get specific person from database",
        summary: "Get specific person from database using typeORM",
        parameters:
            {
                path: {
                    id: {
                        type: SwaggerDefinitionConstant.Parameter.Type.INTEGER,
                        required: true,
                    },
                },
            },
        responses: {
            200: {
                description: "Success", type: SwaggerDefinitionConstant.Response.Type.ARRAY, model: "Person",
            },
        },
    })
    @Get("/example/person/:id")
    public getPerson(@Param("id") person_id: number) {
        const result = this.exampleHelper.getPerson(person_id);
        loggerConfig.register().debug("Requested person by id: ", person_id);
        return result;
    }

    /**
     * Creates new animal
     * @param animal
     */
    @ApiOperationPost({
        path: "/animal/create",
        description: "Create animal",
        summary: "Create new animal",
        parameters: {
            body: { description: "new animal", required: true, model: "Animal"},
        },
        responses: {
            200: { description: "Success" },
            400: { description: "Parameters fail" },
        },
    })
    @Post("/example/animal/create")
    public createAnimal(@Body({validate: true}) animal: Animal) {
        return this.validateObject(animal).then((response) => {
            const res = this.exampleHelper.createAnimal(animal);
            return {message: "Successfully posted animal parameters"};
        }).catch((error) => {
            return {message: error};
        });
    }

    /**
     * Updates existing animal
     * @param animal
     */
    @ApiOperationPost({
        path: "/animal/update",
        description: "Update animal",
        summary: "Update existing animal",
        parameters: {
            body: { description: "update animal", required: true, model: "Animal"},
        },
        responses: {
            200: { description: "Success" },
            400: { description: "Parameters fail" },
        },
    })
    @Post("/example/animal/update")
    public updateAnimal(@Body({validate: true}) animal: Animal) {
        return this.validateObject(animal).then((response) => {
            const res = this.exampleHelper.updateAnimal(animal);
            return {message: "Successfully posted animal parameters"};
        }).catch((error) => {
            return {message: error};
        });
    }

    /**
     * Deletes existing animal
     * @param id
     */
    @ApiOperationDelete({
        path: "/animal/delete/{id}",
        parameters: {
            path: {
                id: {
                    description: "Id of animal",
                    type: SwaggerDefinitionConstant.Parameter.Type.INTEGER,
                    required: true,
                },
            },
        },
        responses: {
            200: { description: "Success" },
        },
    })
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

    /**
     * @returns all animals from database
     */
    @ApiOperationGet({
        path: "/animal/all",
        description: "Get all animals",
        summary: "Get animals request",
        responses: {
            200: {
                description: "Success", type: SwaggerDefinitionConstant.Response.Type.ARRAY, model: "Animal",
            },
        },
    })
    @Get("/example/animal/all")
    public getAnimals() {
        const result = this.exampleHelper.getAllAnimals();
        loggerConfig.register().debug("Requested all animals");
        return result;
    }

    /**
     * @returns specific animal from database
     * @param animal_id
     */
    @ApiOperationGet({
        path: "/animal/{id}",
        description: "Get specific animal from database",
        summary: "Get specific animal from database using typeORM",
        parameters:
            {
                path: {
                    id: {
                        type: SwaggerDefinitionConstant.Parameter.Type.INTEGER,
                        required: true,
                    },
                },
            },
        responses: {
            200: {
                description: "Success", type: SwaggerDefinitionConstant.Response.Type.ARRAY, model: "Animal",
            },
        },
    })
    @Get("/example/animal/:id")
    public getAnimalByID(@Param("id") animal_id: number) {
        const result = this.exampleHelper.getAnimal(animal_id);
        loggerConfig.register().debug("Request animal by id: ", animal_id);
        return result;
    }

    /**
     * Creates new pet
     * @param pet
     */
    @ApiOperationPost({
        path: "/pet/create",
        description: "Create pet",
        summary: "Create new pet",
        parameters: {
            body: { description: "new pet", required: true, model: "Pet"},
        },
        responses: {
            200: { description: "Success" },
            400: { description: "Parameters fail" },
        },
    })
    @Post("/example/pet/create")
    public createPet(@Body({validate: true}) pet: Pet) {
        return this.validateObject(pet).then((response) => {
            const res = this.exampleHelper.createPet(pet);
            return {message: "Successfully posted pet parameters"};
        }).catch((error) => {
            return {message: error};
        });
    }

    /**
     * Updates existing pet
     * @param pet
     */
    @ApiOperationPost({
        path: "/pet/update",
        description: "Update pet",
        summary: "Update existing pet",
        parameters: {
            body: { description: "update pet", required: true, model: "Pet"},
        },
        responses: {
            200: { description: "Success" },
            400: { description: "Parameters fail" },
        },
    })
    @Post("/example/pet/update")
    public updatePet(@Body({validate: true}) pet: Pet) {
        return this.validateObject(pet).then((response) => {
            const res = this.exampleHelper.createPet(pet);
            return {message: "Successfully posted pet parameters"};
        }).catch((error) => {
            return {message: error};
        });
    }

    /**
     * Deletes existing pet
     * @param id
     */
    @ApiOperationDelete({
        path: "/pet/delete/{id}",
        parameters: {
            path: {
                id: {
                    description: "Id of pet",
                    type: SwaggerDefinitionConstant.Parameter.Type.INTEGER,
                    required: true,
                },
            },
        },
        responses: {
            200: { description: "Success" },
        },
    })
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

    /**
     * @returns all pets from database
     */
    @ApiOperationGet({
        path: "/pet/all",
        description: "Get all pets",
        summary: "Get pets request",
        responses: {
            200: {
                description: "Success", type: SwaggerDefinitionConstant.Response.Type.ARRAY, model: "Pet",
            },
        },
    })
    @Get("/example/pet/all")
    public getAllPets() {
        const results = this.exampleHelper.getAllPets();
        loggerConfig.register().debug("Requested all pets");
        return results;
    }

    /**
     * @returns specific pet from database
     * @param pet_id
     */
    @ApiOperationGet({
        path: "/pet/{id}",
        description: "Get specific pet from database",
        summary: "Get specific pet from database using typeORM",
        parameters:
            {
                path: {
                    id: {
                        type: SwaggerDefinitionConstant.Parameter.Type.INTEGER,
                        required: true,
                    },
                },
            },
        responses: {
            200: {
                description: "Success", type: SwaggerDefinitionConstant.Response.Type.ARRAY, model: "Pet",
            },
        },
    })
    @Get("/example/pet/:id")
    public getPetByID(@Param("id") pet_id: number) {
        const result = this.exampleHelper.getPet(pet_id);
        loggerConfig.register().debug("Requested pet by id: ", pet_id);
        return result;
    }

    /**
     * Creates new person-pet relation
     * @param personPet
     */
    @ApiOperationPost({
        path: "/fellows/create",
        description: "Create fellowship",
        summary: "Create new person-pet connection",
        parameters: {
            body: { description: "new fellowship", required: true, model: "PersonPet"},
        },
        responses: {
            200: { description: "Success" },
            400: { description: "Parameters fail" },
        },
    })
    @Post("/example/fellows/create")
    public createFellowship(@Body({validate: true}) personPet: PersonPet) {
        return this.validateObject(personPet).then((response) => {
            const res = this.exampleHelper.createPersonPet(personPet);
            return {message: "Successfully posted person-pet parameters"};
        }).catch((error) => {
            return {message: error};
        });
    }

    /**
     * Updates existing person-pet relation
     * @param personPet
     */
    @ApiOperationPost({
        path: "/fellows/update",
        description: "Update fellowship",
        summary: "Update existing fellowship",
        parameters: {
            body: { description: "update fellowship", required: true, model: "PersonPet"},
        },
        responses: {
            200: { description: "Success" },
            400: { description: "Parameters fail" },
        },
    })
    @Post("/example/fellows/update")
    public updateFellowship(@Body({validate: true}) personPet: PersonPet) {
        return this.validateObject(personPet).then((response) => {
            const res = this.exampleHelper.updatePersonPet(personPet);
            return {message: "Successfully posted person-pet parameters"};
        }).catch((error) => {
            return {message: error};
        });
    }

    /**
     * Deletes exiting person-pet relation
     * @param person_id
     * @param pet_id
     */
    @ApiOperationDelete({
        path: "/fellows/delete/{person_id}/{pet_id}",
        parameters: {
            path: {
                person_id: {
                    description: "Id of person",
                    type: SwaggerDefinitionConstant.Parameter.Type.INTEGER,
                    required: true,
                },
                pet_id: {
                    description: "Id of pet",
                    type: SwaggerDefinitionConstant.Parameter.Type.INTEGER,
                },
            },
        },
        responses: {
            200: { description: "Success" },
        },
    })
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

    /**
     * @returns all person-pet relations
     */
    @ApiOperationGet({
        path: "/fellows/all",
        description: "Get all fellows",
        summary: "Get fellows request",
        responses: {
            200: {
                description: "Success", type: SwaggerDefinitionConstant.Response.Type.ARRAY, model: "PersonPet",
            },
        },
    })
    @Get("/example/fellows/all")
    public getAllFellows() {
        const result = this.exampleHelper.getAllPersonPet();
        loggerConfig.register().debug("Requested all person-pet models");
        return result;
    }

    /**
     * @returns person-pet relations for specific person
     * @param person_id
     */
    @ApiOperationGet({
        path: "/fellows/{id}",
        description: "Get specific fellowship from database by PersonId",
        summary: "Get specific person-pet pair from database using typeORM",
        parameters:
            {
                path: {
                    id: {
                        type: SwaggerDefinitionConstant.Parameter.Type.INTEGER,
                        required: true,
                    },
                },
            },
        responses: {
            200: {
                description: "Success", type: SwaggerDefinitionConstant.Response.Type.ARRAY, model: "PersonPet",
            },
        },
    })
    @Get("/example/fellows/:id")
    public getFellowsByPerson(@Param("id") person_id: number) {
        const result = this.exampleHelper.getPersonPetsByPersonID(person_id);
        loggerConfig.register().debug("Requested person-pet objects by personId: ", person_id);
        return result;
    }
}
