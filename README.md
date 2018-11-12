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
```npm start```

## Plugins
Here is a list of used NPM dependencies:
| Package | Version | Dev |
| --- | --- | --- |
| [@types/chai](https://www.npmjs.com/package/@types/chai) | **^4.1.7** | ✖ |

## Application structure
Explain application structure

## Route definitions
Explain how routes are defined in our application

## Swagger documentation
Explain how swagger documentation is defined in our application

## Testing
Explain how test are defined in our application

## Frameworks (libraries)
Explain which libraries we are using


