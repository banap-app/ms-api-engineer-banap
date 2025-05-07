import { Entity } from "../../shared/domain/Entity";
import { Notification } from "../../shared/domain/validators/Notification";
import { Uuid } from "../../shared/domain/value-objects/UuidVo";
import { ValueObject } from "../../shared/domain/ValueObject";
import { EngineerValidatorFactory } from "./EngineerValidator";
import { Password } from "./PasswordVo";


export class EngineerId extends Uuid { }

export type EngineerConstructorCreate = {
    engineer_id?: EngineerId
    name: string
    email: string
    password: Password
    createdAt?: Date
    updatedAt?: Date
}

export type EngineerCommandCreate = {
    name: string
    email: string
    password: Password
}

export class Engineer extends Entity {

    private engineer_id: EngineerId
    private name: string
    private email: string
    private password: Password
    private createdAt: Date
    private updatedAt: Date

    constructor(props:EngineerConstructorCreate) {
        super()
        this.engineer_id = props.engineer_id ?? new EngineerId()
        this.name = props.name
        this.email = props.email
        this.password = props.password
        this.createdAt = props.createdAt ?? new Date()
        this.updatedAt = props.updatedAt ?? new Date()
    }

    static create(props: EngineerCommandCreate) {
        const engineer = new Engineer(props)
        engineer.validate()
    }

    validate(fields?: string[]) {
        const validator = EngineerValidatorFactory.create()
        const notification = new Notification()
        validator.validate(notification, this, fields)
    } 

    toJSON() {
       return {
        engineer_id:this.engineer_id,
        name: this.name,
        password:this.password,
        email:this.email,
        updatedAt:this.updatedAt,
        createdAt:this.createdAt
       }
    }
    getId(): ValueObject {
        throw new Error("Method not implemented.");
    }


}