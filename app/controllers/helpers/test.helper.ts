import {User} from "../../models/User";

import {Repository} from "typeorm";

/**
 * Business logic for TestControllers
 */
class TestHelper {
    private userRepository: Repository<User>;

    /**
     * TestHelper constructor
     * @param user
     */
    constructor(user: Repository<User>) {
        this.userRepository = user;
    }

    /**
     * @returns all users
     */
    public async getAllUsers() {
        return await this.userRepository.find();
    }

    /**
     * @returns user by id
     * @param id
     */
    public async getUser(id: number) {
        return await this.userRepository.findOne(id);
    }

    /**
     * creates a new user in database
     * @param data
     */
    public async postUser(data: User) {
        console.log(data);
        const user = new User();
        user.username = data.username;
        user.email = data.email;
        user.first_name = data.first_name;
        user.last_name = data.last_name;
        await user.save();
    }
}

export default TestHelper;
