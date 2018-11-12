# Node.js REST boilerplate using TypeScript
This boilerplate was written using Node.js with express framework, in TypeScript. It's using ES2016 when compiled.
Alongside API endpoints, there are development tools for documenting API's available in the project:
* /docs - List of all available functions and parameters with comments
* /api-docs/swagger/#/ - Swagger instance with all available endpoints

## Installation
This boilerplate uses node.js and typescript. Ensure you have them installed globally.
Clone the project and run
```
npm install
```
With this command, all the required packages are installed. After this, project needs to be built
```
npm run build
```
This command compiles project into javascript, runs tslint for errors, creates docs and runs all available tests.
You can also run these scripts separately

* npm run test    `mocha -r ts-node/register app/controllers/*.test.ts`
* tsc             `tsc`
* npm run tslint  `tslint -c tslint.json 'app/**/*.ts'`
* npm run docs    `./node_modules/.bin/typedoc --out ./docs/typedoc --mode modules`

You can now run the project:
```
npm start
```

## Plugins
> Here is a list of used NPM dependencies:

| Package | Version | Dev |
| :--- | :---: | :---: |
| [@types/chai](https://www.npmjs.com/package/@types/chai) | **^4.1.7** | ✖ |
| [@types/chai-http](https://www.npmjs.com/package/@types/chai-http) | **^3.0.5** | ✖ |
| [@types/es6-shim](https://www.npmjs.com/package/@types/es6-shim) | **^0.31.38** | ✖ |
| [@types/express](https://www.npmjs.com/package/@types/express) | **^4.16.0** | ✖ |
| [@types/mocha](https://www.npmjs.com/package/@types/mocha) | **^5.2.5** | ✖ |
| [@types/multer](https://www.npmjs.com/package/@types/multer) | **^1.3.7** | ✖ |
| [@types/swagger-ui-express](https://www.npmjs.com/package/@types/swagger-ui-express) | **^3.0.0** | ✖ |
| [body-parser](https://www.npmjs.com/package/body-parser) | **^1.18.3** | ✖ |
| [chai](https://www.npmjs.com/package/chai) | **^4.2.0** | ✖ |
| [chai-http](https://www.npmjs.com/package/chai-http) | **^4.2.0** | ✖ |
| [class-transformer](https://www.npmjs.com/package/class-transformer) | **^0.1.9** | ✖ |
| [class-validator](https://www.npmjs.com/package/class-validator) | **^0.9.1** | ✖ |
| [express](https://www.npmjs.com/package/express) | **^4.16.4** | ✖ |
| [mocha](https://www.npmjs.com/package/mocha) | **^5.2.0** | ✖ |
| [mysql](https://www.npmjs.com/package/mysql) | **^2.16.0** | ✖ |
| [path-resolve](https://www.npmjs.com/package/path-resolve) | **0.0.1** | ✖ |
| [reflect-metadata](https://www.npmjs.com/package/reflect-metadata) | **^0.1.12** | ✖ |
| [routing-controllers](https://www.npmjs.com/package/routing-controllers) | **^0.7.7** | ✖ |
| [swagger-express-ts](https://www.npmjs.com/package/swagger-express-ts) | **^1.0.0** | ✖ |
| [ts-log-debug](https://www.npmjs.com/package/ts-log-debug) | **^4.0.4** | ✖ |
| [ts-node](https://www.npmjs.com/package/ts-node) | **^7.0.1** | ✖ |
| [typeorm](https://www.npmjs.com/package/typeorm) | **^0.2.8** | ✖ |
| [typescript](https://www.npmjs.com/package/typescript) | **^3.1.6** | ✔ |
| [tslint](https://www.npmjs.com/package/tslint) | **^5.11.0** | ✔ |
| [typedoc](https://www.npmjs.com/package/typedoc) | **^0.13.0** | ✔ |

## Application structure
> Folder structure options and naming conventions for rest api
```
.
├──app                  # application logic
│  ├──config                # application config files (database connection, logger, swagger, tsdoc)
│  ├──controllers           # entry point for requests, input validation
│  │  ├──helpers                # business logic
│  ├──core                  # bootstrap files
│  ├──models                # ORM models, mapped to database
│  ├──services              # shared repository
│  └──app.ts                # application entry point
├──build                # compiled files
├──docs                 # generated documentation files
├──logs                 # log files
├──node_modules         # npm package dependencies
├──.gitignore
├──tsconfig.json        # typescript configuration
├──tslint.json          # tslint configuration
├──package.json
├──LICENCE
└──README.md
```
## Route definitions
Routing is a bit specific, since our project is not using express framework's routing, but rather `routing-controller` package which allows us to use
decorators for our routes. This way, our application structure doesn't have any need for route folder, and the code looks more like java/spring annotations.
> Here's an example of GET route:
```
    @Get("/api/users")
    public getAllUsers(req: Request, res: Response, next: NextFunction) {
        const results = this.testHelper.getAllUsers();
        loggerConfig.register().debug("Users returned successfully");
        return results;
    }
```

## Swagger documentation
This project uses typescript implementation for swagger - `swagger-express-ts`. It puts decorators to a good use, as well as our routing. Small setback is that it uses
different decorators than our routing, so it needs to be defined separately.
> Here is an entire example using swagger decorator with previous example using routing-controller:
```
@ApiOperationGet({
        path: "/users",
        description: "Get all users from database",
        summary: "Get all users from database using typeORM",
        responses: {
            200: {
                description: "Success", type: SwaggerDefinitionConstant.Response.Type.ARRAY, model: "User",
            },
        },
    })
    @Get("/api/users")
    public getAllUsers(req: Request, res: Response, next: NextFunction) {
        const results = this.testHelper.getAllUsers();
        loggerConfig.register().debug("Users returned successfully");
        return results;
    }
```
This library doesn't require any specific config file, it makes documentation on the run.

## Testing
For tests, this project uses `mocha` and `chai`. Tests are defined next to controllers, in the same folders. Thus, every controller has it's corresponding test.
> test.controller.ts - test.controller.test.ts
> Here's an example of one simple test
```
describe("TEST API REQUEST", () => {
    it("should return response an call", () => {
        return chai.request(app).get("/api/test")
            .then((res) => {
                chai.expect(res.body).to.eql({});
            });
    });
});
```

## Frameworks (libraries)
Explain which libraries we are using


