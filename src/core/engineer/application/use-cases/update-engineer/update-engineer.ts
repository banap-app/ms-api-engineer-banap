import { CREA } from 'src/core/engineer/domain/crea-vo';
import { EngineerId } from 'src/core/engineer/domain/engineer';
import { EngineerRepository } from 'src/core/engineer/domain/engineer-repository';
import { HashService } from 'src/core/shared/application/hash-service';
import { UseCase } from 'src/core/shared/application/use-case';
import { NotFoundError } from 'src/core/shared/domain/errors/not-found-error';
import { EntityValidationError } from 'src/core/shared/domain/validators/validation-errors';
import { UpdateEngineerCommand } from './update-engineer-command';

export type UpdateEngineerOutput = void;

export class UpdateEngineerUseCase
  implements UseCase<UpdateEngineerCommand, UpdateEngineerOutput>
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
    aCommand: UpdateEngineerCommand,
  ): Promise<UpdateEngineerOutput> {
    const engineer = await this.engineerRepository.findById(
      new EngineerId(aCommand.engineerId),
    );

    if (!engineer) {
      throw new NotFoundError('engineer');
    }
    if (!engineer.isActive) {
      throw new NotFoundError('engineer');
    }

    if (aCommand.email && aCommand.email != engineer.email) {
      const existingUser = await this.engineerRepository.findByEmail(
        aCommand.email,
      );
      if (existingUser && existingUser.id.uuid != engineer.id.uuid) {
        engineer.notification.addError('email already in use', 'email');
      } else {
        engineer.changeEmail(aCommand.email);
      }
    }

    if (aCommand.crea && aCommand.crea != engineer.crea.value) {
      const [crea, creaError] = CREA.create(aCommand.crea).toTuple();

      if (creaError) {
        engineer.notification.addError(creaError.message, 'crea');
      } else {
        const duplicateCrea = await this.engineerRepository.findByCrea(crea);
        if (duplicateCrea) {
          engineer.notification.addError('crea already registered', 'crea');
        } else {
          engineer.changeCrea(aCommand.crea);
        }
      }
    }
    if (aCommand.name) {
      engineer.changeName(aCommand.name);
    }

    if (aCommand.profilePicture) {
      engineer.changeProfilePicture(aCommand.profilePicture);
    }

    if (engineer.notification.hasErrors()) {
      throw new EntityValidationError(engineer.notification.toJSON());
    }

    await this.engineerRepository.update(engineer);
  }
}
