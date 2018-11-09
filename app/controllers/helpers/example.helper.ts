import {Person} from "../../models/Person";
import {Animal} from "../../models/Animal";
import {Pet} from "../../models/Pet";
import {PersonPet} from "../../models/PersonPet";
import {Repository} from "typeorm";

/**
 * Business logic for example controller
 * Considering: person - pet relationships
 */
class ExampleHelper {
    private personRepository: Repository<Person>;
    private animalRepository: Repository<Animal>;
    private petRepository: Repository<Pet>;
    private personPetRepository: Repository<PersonPet>;

    constructor(person: Repository<Person>, animal: Repository<Animal>, pet: Repository<Pet>, personPet: Repository<PersonPet>) {
        this.personRepository = person;
        this.animalRepository = animal;
        this.petRepository = pet;
        this.personPetRepository = personPet;
    }

    /**
     * Save person data
     * @param data
     */
    public async createPerson(data: Person) {
        const person = new Person();
        person.first_name = data.first_name;
        person.last_name = data.last_name;
        person.email = data.email;
        person.gender = data.gender;
        person.birth_date = data.birth_date;

        await person.save();
    }

    /**
     * @returns all persons
     */
    public async getAllPersons() {
        return await this.personRepository.find();
    }

    /**
     * @returns person by it's id
     * @param id
     */
    public async getPerson(id: number) {
        return await this.personRepository.findOne(id);
    }

    /**
     * Save animal data
     * @param data
     */
    public async createAnimal(data: Animal) {
        const animal = new Animal();
        animal.name = data.name;

        await animal.save();
    }

    /**
     * @return all animal types
     */
    public async getAllAnimals() {
        return await this.animalRepository.find();
    }

    /**
     * @returns animal by it's id
     * @param id
     */
    public async getAnimal(id: number) {
        return await this.animalRepository.findOne(id);
    }

    /**
     * Save pet data
     * @param data
     */
    public async createPet(data: Pet) {
        const pet = new Pet();
        pet.animal_id = data.animal_id;
        pet.name = data.name;
        pet.age = data.age;

        await pet.save();
    }

    /**
     * @returns all pets
     */
    public async getAllPets() {
        return await this.petRepository.find({relations: ["animal_id"]});
    }

    public async getPet(id: number) {
        return await this.petRepository.findOne(id, {relations: ["animal_id"]});
    }

    /**
     * Save person-pet relationship
     * @param data
     */
    public async createPersonPet(data: PersonPet) {
        const personPet = new PersonPet();
        personPet.person_id = data.person_id;
        personPet.pet_id = data.pet_id;
        personPet.started_fellowship = data.started_fellowship;

        await personPet.save();
    }

    /**
     * @returns all person-pet relations
     */
    public async getAllPersonPet() {
        return await this.personPetRepository.find({relations: ["person", "pet"]});
    }

    /**
     * @returns all person-pet relations for one person
     * @param person
     */
    public async getPersonPetsByPersonID(person: number) {
        return await this.personPetRepository.find({relations: ["person", "pet", "pet.animal"], where: {person_id: person}});
    }
}

export default ExampleHelper;
