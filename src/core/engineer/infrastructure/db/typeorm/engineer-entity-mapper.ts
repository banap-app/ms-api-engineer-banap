import { CREA } from 'src/core/engineer/domain/crea-vo';
import { Engineer, EngineerId } from 'src/core/engineer/domain/engineer';
import { Password } from 'src/core/engineer/domain/password-vo';
import { ProfilePicture } from 'src/core/engineer/domain/profile-picture-vo';
import { CreaEntity, EngineerEntity } from './engineer-entity';

export class EngineerEntityMapper {
  static toEntity(engineer: Engineer): EngineerEntity {
    return EngineerEntity.fromDomain({
      engineerId: engineer.id,
      name: engineer.name,
      email: engineer.email,
      password: engineer.password,
      profilePicture: engineer.profilePicture,
      crea: engineer.crea,
      userType: engineer.userType,
      isActive: engineer.isActive,
      createdAt: engineer.createdAt,
      updatedAt: engineer.updatedAt,
      deletedAt: engineer.deletedAt,
    });
  }

  static toDomain(
    engineerEntity: EngineerEntity,
    options?: { creaEntity?: CreaEntity; needPassword: boolean },
  ): Engineer {
    const engineer = new Engineer({
      engineerId: new EngineerId(engineerEntity.id),
      name: engineerEntity.name,
      email: engineerEntity.email,
      password:
        options.needPassword == true && engineerEntity.password
          ? Password.hashPassword(engineerEntity.password)
          : null,
      profilePicture: engineerEntity.profile_picture
        ? new ProfilePicture({
            name: engineerEntity.profile_picture.name,
            location: engineerEntity.profile_picture.location,
          })
        : null,
      crea: options?.creaEntity
        ? options.creaEntity.toVo()
        : CREA.createWithValidation(''),
      userType: engineerEntity.user_type,
      isActive: engineerEntity.is_active,
      createdAt: engineerEntity.created_at,
      updatedAt: engineerEntity.updated_at,
      deletedAt: engineerEntity.deleted_at,
    });

    engineer.validate();

    if (engineer.notification.hasErrors()) {
      throw new Error(engineer.notification.toJSON());
    }
    return engineer;
  }
}
