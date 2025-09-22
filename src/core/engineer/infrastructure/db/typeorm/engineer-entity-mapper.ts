import { Engineer, EngineerId } from 'src/core/engineer/domain/engineer';
import { EngineerEntity } from './engineer-entity';
import { Password } from 'src/core/engineer/domain/password-vo';

export class EngineerEntityMapper {
  static toEntity(engineer: Engineer): EngineerEntity {
    return EngineerEntity.fromDomain({
      engineerId: engineer.id,
      name: engineer.name,
      email: engineer.email,
      password: engineer.password as any,
      profilePicture: engineer.profilePicture,
      crea: engineer.crea,
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
