import express from "express";
/**
 * Configuration file for tsdoc
 */
class TsdocConfig {
    public register = (app: any) => {
        this.configRoutes(app);
    }

    public configRoutes = (app: any) => {
        app.use("/docs", express.static("docs/typedoc"));
    }
}
export default new TsdocConfig();
