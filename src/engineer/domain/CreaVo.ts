import { Either } from "src/shared/domain/Either";
import { ValueObject } from "src/shared/domain/ValueObject";

export class Crea extends ValueObject {
    private crea: string
    constructor(crea:string) {
        super()
        this.crea = crea
        this.validate()
    }

    private validate() {
        if (this.crea == null) {
            let error = new Error("Invalid Crea")
            error.name = "InvalidCrea"
            throw error
        }
    }

    static create(crea: string): Either<Crea, Error> {
        return Either.safe(()=>new Crea(crea))
    }
}