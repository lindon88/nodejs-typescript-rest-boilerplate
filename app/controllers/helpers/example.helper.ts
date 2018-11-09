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
     * Save animal data
     * @param data
     */
    public async createAnimal(data: Animal) {
        const animal = new Animal();
        animal.name = data.name;

        await animal.save();
    }

    public async createPet(data: Pet) {
        const pet = new Pet();
        pet.animal = data.animal;
        pet.name = data.name;
        pet.age = data.age;

        await pet.save();
    }

    public async createPersonPet(data: PersonPet) {
        const personPet = new PersonPet();
        personPet.person = data.person;
        personPet.person_id = data.person_id;
        personPet.pet = data.pet;
        personPet.pet_id = data.pet_id;
        personPet.started_fellowship = data.started_fellowship;

        await personPet.save();
    }
}
