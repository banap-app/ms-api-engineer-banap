import { Entity } from "../../shared/domain/Entity";
import { Notification } from "../../shared/domain/validators/Notification";
import { Uuid } from "../../shared/domain/value-objects/UuidVo";
import { ValueObject } from "../../shared/domain/ValueObject";
import { Crea } from "./CreaVo";
import { EngineerValidatorFactory } from "./EngineerValidator";
import { Password } from "./PasswordVo";


export class EngineerId extends Uuid { }

export type EngineerConstructorCreate = {
    engineer_id?: EngineerId
    name: string
    email: string
    password: Password
    isActive: boolean
    crea: Crea
    createdAt?: Date
    updatedAt?: Date
}

export type EngineerCommandCreate = {
    name: string
    email: string
    isActive: boolean
    password: Password
    crea: Crea
}

export class Engineer extends Entity {

    private engineer_id: EngineerId
    private name: string
    private email: string
    private password: Password
    private crea: Crea
    private createdAt: Date
    private updatedAt: Date

    constructor(props:EngineerConstructorCreate) {
        super()
        this.engineer_id = props.engineer_id ?? new EngineerId()
        this.name = props.name
        this.email = props.email
        this.password = props.password
        this.crea = props.crea
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
        crea: this.crea,
        updatedAt:this.updatedAt,
        createdAt:this.createdAt
       }
    }
    get getId(): ValueObject {
        return this.engineer_id
    }


}