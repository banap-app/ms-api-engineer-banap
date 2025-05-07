import { Notification } from "./Notification"

export type FieldErros =
    | {
        [field: string]: string[]
    }
    | string

export interface IValidatorRules {

    validate(notification: Notification, data: any, fields?: string[]): boolean;

}