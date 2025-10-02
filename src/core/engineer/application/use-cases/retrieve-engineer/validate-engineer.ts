import { EngineerId } from 'src/core/engineer/domain/engineer';
import { EngineerRepository } from 'src/core/engineer/domain/engineer-repository';
import { UseCase } from 'src/core/shared/application/use-case';
import { GetEngineerCommand } from './get-engineer-command';

export type ValidateEngineerOutput = boolean;

export class ValidateEngineerUseCase
  implements UseCase<GetEngineerCommand, ValidateEngineerOutput>
{
  private readonly engineerRepository: EngineerRepository;

  constructor(engineerRepository: EngineerRepository) {
    this.engineerRepository = engineerRepository;
  }

  async execute(aCommand: GetEngineerCommand): Promise<ValidateEngineerOutput> {
    const engineer = await this.engineerRepository.findById(
      new EngineerId(aCommand.engineerId),
    );

    if (!engineer) {
      return false;
    }

    if (!engineer.isActive) {
      return false;
    }

    return true;
  }
}
