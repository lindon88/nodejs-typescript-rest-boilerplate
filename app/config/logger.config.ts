import {Logger} from "ts-log-debug";
import pathResolve = require("path");
import {log} from "util";

/**
 * Configuration file for logger
 */
class LoggerConfig {
    /**
     * @returns logger
     */
    public register = () => {
        const logger = new Logger("service");
        logger.appenders
            .set("std-log", {
                type: "stdout",
                levels: ["debug", "info", "trace"],
            })
            .set("error-log", {
                type: "stderr",
                levels: ["fatal", "error", "warn"],
                layout: {
                    type: "pattern",
                    pattern: "%d %p %c %X{user} %m%n",
                },
            })
            .set("all-log-file", {
                type: "file",
                filename: pathResolve.resolve(__dirname + "../../../logs/app.log"),
                layout: {
                    type: "pattern",
                    pattern: "%d %p %c %X{user} %m%n",
                },
            });
        return logger;
    }
}
export default new LoggerConfig();
