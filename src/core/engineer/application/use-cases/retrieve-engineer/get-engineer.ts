import { UseCase } from 'src/core/shared/application/use-case';
import {
  EngineerOutput,
  EngineerOutputMapper,
} from '../../commons/engineer-output-mapper';
import { GetEngineerCommand } from './get-engineer-command';
import { EngineerRepository } from 'src/core/engineer/domain/engineer-repository';
import { Engineer, EngineerId } from 'src/core/engineer/domain/engineer';
import { NotFoundError } from 'src/core/shared/domain/errors/not-found-error';

export type GetEngineerOutput = EngineerOutput;

export class GetEngineerUseCase
  implements UseCase<GetEngineerCommand, GetEngineerOutput>
{
  private engineerRepository: EngineerRepository;

  constructor(engineerRepository: EngineerRepository) {
    this.engineerRepository = engineerRepository;
  }

  async execute(aCommand: GetEngineerCommand): Promise<GetEngineerOutput> {
    const engineer = await this.engineerRepository.findById(
      new EngineerId(aCommand.engineerId),
    );

    if (!engineer) {
      throw new NotFoundError('engineer');
    }

    return EngineerOutputMapper.toOutput(engineer);
  }
}
