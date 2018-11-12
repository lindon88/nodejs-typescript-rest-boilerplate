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
            host:     process.env.DB_HOST || "localhost",
            port:     3306,
            username: "root",
            password: "test1234",
            database: "test",
            entities: ["build/models/*.js"],
            logging:  true,
            synchronize: true,
        };
    }
}
export default new DbConfig();
