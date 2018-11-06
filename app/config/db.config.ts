import {createConnection} from "typeorm";

class DbConfig {
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
            logging:  true,
        };
    }
}
export default new DbConfig();
