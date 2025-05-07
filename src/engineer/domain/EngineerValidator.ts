import { ClassValidatorRules } from "../../shared/domain/validators/ClassValidatorRules";
import { Notification } from "../../shared/domain/validators/Notification";
import { Engineer } from "./Engineer";

export class EngineerRules {
    
    constructor(entity: Engineer) {
        Object.assign(this, entity)
    }
}

export class EngineerValidator extends ClassValidatorRules {
    validate(notification: Notification, data: any, fields?: string[]): boolean {
        const newFiels = fields?.length ? fields : ['name']
        return super.validate(notification,new EngineerRules(data) ,newFiels)
    }
}


export class EngineerValidatorFactory {
    static create() {
        return new EngineerValidator()
    }
}