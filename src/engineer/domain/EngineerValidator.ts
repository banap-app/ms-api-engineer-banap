import { IsEmail, IsNotEmpty, IsStrongPassword, MaxLength, MinLength } from "class-validator";
import { ClassValidatorRules } from "../../shared/domain/validators/ClassValidatorRules";
import { Notification } from "../../shared/domain/validators/Notification";
import { Engineer } from "./Engineer";
import { Password } from "./PasswordVo";
import { Crea } from "./CreaVo";

export class EngineerRules {

    @MinLength(3)
    @MaxLength(255, {groups: ['name']})
    @IsNotEmpty()
    name: string


    @IsEmail()
    @MinLength(20)
    @MaxLength(255, {groups: ['email']})
    email: string

    @IsNotEmpty({groups: ['password']})
    password: Password

    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(12, {
        groups: ['crea']
    })
    crea: Crea


    @IsNotEmpty()
    isActive: boolean

    constructor(entity: Engineer) {
        Object.assign(this, entity)
    }
}

export class EngineerValidator extends ClassValidatorRules {
    validate(notification: Notification, data: any, fields?: string[]): boolean {
        const newFiels = fields?.length ? fields : ['name', 'email', 'password', 'crea']
        return super.validate(notification, new EngineerRules(data), newFiels)
    }
}


export class EngineerValidatorFactory {
    static create() {
        return new EngineerValidator()
    }
}