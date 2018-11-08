import {createConnection} from "typeorm";

/**
 * Configuration file for database
 */
class DbConfig {
    /**
     * @returns connection
     */
    public connection = () => {
        return {
            type:     "mysql",
            name:     "default",
            host:     "localhost",
            port:     3306,
            username: "root",
            password: "test1234",
            database: "test",
            entities: ["build/models/*.js"],
            logging:  false,
        };
    }
}
export default new DbConfig();
