import { ValueObject } from "./ValueObject";

export abstract class Entity {
    abstract getId(): ValueObject
    abstract toJSON: any
}