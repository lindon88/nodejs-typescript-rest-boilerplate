import {validate} from "class-validator";
export abstract class BaseController {
    public validateObject(obj: any) {
        return new Promise((resolve, reject) => {
            validate(obj).then((errors) => {
                if (errors.length > 0) {
                    reject(errors);
                } else {
                    resolve(true);
                }
            });
        });
    }
}
