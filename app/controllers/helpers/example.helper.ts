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
     * Update person data
     * @param data
     */
    public async updatePerson(data: Person) {
        const person = await this.personRepository.findOne(data.id);
        if (person) {
            person.first_name = data.first_name;
            person.last_name = data.last_name;
            person.email = data.email;
            await person.save();
        }
    }

    /**
     * Delete person
     * @param id
     */
    public async deletePerson(id: number) {
        const personToRemove = await this.personRepository.findOne(id);
        if (personToRemove) {
            await this.personRepository.remove(personToRemove);
        }
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
     * update Animal
     * @param data
     */
    public async updateAnimal(data: Animal) {
        const animal = await this.animalRepository.findOne(data.id);
        if (animal) {
            animal.name = data.name;
            await animal.save();
        }
    }

    /**
     * Delete animal
     * @param id
     */
    public async deleteAnimal(id: number) {
        const animalToRemove = await this.animalRepository.findOne(id);
        if (animalToRemove) {
            await this.animalRepository.remove(animalToRemove);
        }
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
     * Update pet
     * @param data
     */
    public async updatePet(data: Pet) {
        const pet = await this.petRepository.findOne(data.id);
        if (pet) {
            pet.name = data.name;
            pet.age = data.age;
            await pet.save();
        }
    }

    public async deletePet(id: number) {
        const petToRemove = await this.petRepository.findOne(id);
        if (petToRemove) {
            await this.petRepository.remove(petToRemove!);
        }
    }

    /**
     * @returns all pets
     */
    public async getAllPets() {
        return await this.petRepository.find({relations: ["animal_id"]});
    }

    /**
     * @returns pet by id
     * @param id
     */
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
     * Update person-pet
     * @param data
     */
    public async updatePersonPet(data: PersonPet) {
        const personPet = await this.personPetRepository.findOne(data.person_id);
        if (personPet) {
            personPet.started_fellowship = data.started_fellowship;

            await personPet.save();
        }
    }

    /**
     * Remove fellowship
     * @param person_id
     * @param pet_id
     */
    public async deletePersonPet(person_id: number, pet_id: number) {
        const personPetToRemove = await this.personPetRepository.find({where: {person_id, pet_id}});
        if (personPetToRemove) {
            await this.personPetRepository.remove(personPetToRemove);
        }
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
