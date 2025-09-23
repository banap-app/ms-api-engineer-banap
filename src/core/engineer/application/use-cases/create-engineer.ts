import { HashService } from 'src/core/shared/application/hash-service';
import { UseCase } from 'src/core/shared/application/use-case';
import { EntityValidationException } from 'src/core/shared/domain/validators/validation-errors';
import { Engineer } from '../../domain/engineer';
import { EngineerRepository } from '../../domain/engineer-repository';
import {
  EngineerOutput,
  EngineerOutputMapper,
} from '../commons/engineer-output-mapper';
import { CreateEngineerCommand } from './create-engineer-command';

export type CreateEngineerOutput = EngineerOutput;

export class CreateEngineerUseCase
  implements UseCase<CreateEngineerCommand, CreateEngineerOutput>
{
  private engineerRepository: EngineerRepository;
  private hashService: HashService;

  constructor(
    engineerRepository: EngineerRepository,
    hashService: HashService,
  ) {
    this.engineerRepository = engineerRepository;
    this.hashService = hashService;
  }

  async execute(
    aCommand: CreateEngineerCommand,
  ): Promise<CreateEngineerOutput> {
    const aEngineer = Engineer.create(aCommand);

    const existingUser = await this.engineerRepository.findByEmail(
      aEngineer.email,
    );
    if (existingUser) {
      aEngineer.notification.addError('email already in use', 'email');
    }

    if (aEngineer.notification.hasErrors()) {
      throw new EntityValidationException(aEngineer.notification.toJSON());
    }

    const hashPassword = await this.hashService.encode(
      aEngineer.password.value,
      10,
    );

    aEngineer.changeHashedPassword(hashPassword);

    await this.engineerRepository.insert(aEngineer);

    return EngineerOutputMapper.toOutput(aEngineer);
  }
}
