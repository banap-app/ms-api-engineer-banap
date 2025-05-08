import { UseCase } from "src/shared/application/IUseCase";

export class CreateEngineerUseCase implements UseCase<CreateEngineerCommand, CreateEngineerOutput> {
    execute(aCommand: CreateEngineerCommand): Promise<CreateEngineerOutput> {
        throw new Error("Method not implemented.");
    }

} 