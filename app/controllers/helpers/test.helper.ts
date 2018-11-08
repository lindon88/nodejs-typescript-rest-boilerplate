import {User} from "../../models/User";

import {Repository} from "typeorm";
import {Param} from "routing-controllers";

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

    public async getUser(id: number) {
        return await this.userRepository.findOne(id);
    }
}

export default TestHelper;
