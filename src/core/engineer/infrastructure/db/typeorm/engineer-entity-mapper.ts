import { Engineer, EngineerId } from 'src/core/engineer/domain/engineer';
import { Password } from 'src/core/engineer/domain/password-vo';
import { EngineerEntity } from './engineer-entity';

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
    options: { needPassword: boolean } = { needPassword: false },
  ): Engineer {
    const engineer = new Engineer({
      engineerId: new EngineerId(engineerEntity.id),
      name: engineerEntity.name,
      email: engineerEntity.email,
      password:
        options.needPassword == true && engineerEntity.password
          ? Password.hashPassword(engineerEntity.password)
          : null,
      profilePicture: engineerEntity.profile_picture,
      crea: engineerEntity.crea.toVo(),
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
