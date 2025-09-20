import { UseCase } from 'src/core/shared/application/use-case';
import { Engineer } from '../../domain/engineer';
import { CreateEngineerCommand } from './create-engineer-command';
import { EngineerRepository } from '../../domain/engineer-repository';
import {
  EngineerOutput,
  EngineerOutputMapper,
} from '../commons/engineer-output-mapper';
import { Hash } from 'crypto';
import { HashService } from 'src/core/shared/application/hash-service';
import { EntityValidationError } from 'src/core/shared/domain/validators/validation-errors';

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
      aEngineer.notification.addError('Email already in use', 'engineer');
    }

    if (aEngineer.notification.hasErrors()) {
      throw new EntityValidationError(aEngineer.notification.toJSON());
    }

    const hashPassword = await this.hashService.encode(aEngineer.password, 10);

    aEngineer.changeHashedPassword(hashPassword);

    await this.engineerRepository.insert(aEngineer);

    return EngineerOutputMapper.toOutput(aEngineer);
  }
}
