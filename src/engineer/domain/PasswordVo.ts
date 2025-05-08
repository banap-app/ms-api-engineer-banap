import { ValueObject } from "src/shared/domain/ValueObject";
import { Either } from "../../shared/domain/Either";
import { InvalidPasswordError } from "../../shared/domain/errors/InvalidPasswordError";


export class Password extends ValueObject {
    private password: string

    constructor(password: string) {
        super()
        this.password = password
        this.validate()
    }

    private validate() {
        let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/;
        const isValid = regex.test(this.password)
        if (!isValid) {
            throw new InvalidPasswordError()
        }
    } 

    static create(password:string): Either<Password, InvalidPasswordError> {
        return Either.safe(()=> new Password(password))
    }
}