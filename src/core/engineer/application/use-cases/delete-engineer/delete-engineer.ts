import { EngineerId } from 'src/core/engineer/domain/engineer';
import { EngineerRepository } from 'src/core/engineer/domain/engineer-repository';
import { UseCase } from 'src/core/shared/application/use-case';
import { NotFoundError } from 'src/core/shared/domain/errors/not-found-error';
import { DeleteEngineerCommand } from './delete-engineer-command';

export type DeleteEngineerOutput = void;

export class DeleteEngineerUseCase
  implements UseCase<DeleteEngineerCommand, DeleteEngineerOutput>
{
  private engineerRepository: EngineerRepository;

  constructor(engineerRepository: EngineerRepository) {
    this.engineerRepository = engineerRepository;
  }

  async execute(aCommand: DeleteEngineerCommand): Promise<void> {
    const id = new EngineerId(aCommand.engineerId);

    const engineer = await this.engineerRepository.findById(id);
    if (!engineer) {
      throw new NotFoundError('user');
    }
    if (!engineer.isActive) {
      throw new NotFoundError('user');
    }

    engineer.deactivate();

    await this.engineerRepository.update(engineer);

    return;
  }
}
