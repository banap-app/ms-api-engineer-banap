import { CREA } from 'src/core/engineer/domain/crea-vo';
import { Engineer, EngineerId } from 'src/core/engineer/domain/engineer';
import { EngineerRepository } from 'src/core/engineer/domain/engineer-repository';
import { Repository } from 'typeorm';
import {
  CreaEntity,
  EngineerEntity,
  ProfilePictureEntity,
} from './engineer-entity';
import { EngineerEntityMapper } from './engineer-entity-mapper';

export class EngineerTypeOrmRepository implements EngineerRepository {
  private ormRepository: Repository<EngineerEntity>;
  private creaRepository: Repository<CreaEntity>;

  constructor(
    ormRepository: Repository<EngineerEntity>,
    creaRepository: Repository<CreaEntity>,
  ) {
    this.ormRepository = ormRepository;
    this.creaRepository = creaRepository;
  }

  async insert(entity: Engineer): Promise<void> {
    const engineer = EngineerEntityMapper.toEntity(entity);

    if (entity.profilePicture) {
      engineer.profile_picture = ProfilePictureEntity.fromVo(
        entity.profilePicture,
      );
    }

    await this.ormRepository.save(engineer);

    if (entity.crea) {
      const crea = CreaEntity.fromVo(entity.crea, entity.id.uuid);
      await this.creaRepository.save(crea);
    }
  }

  async bulkInsert(entities: Engineer[]): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async update(entity: Engineer): Promise<void> {
    const engineer = await this.ormRepository.findOneBy({
      id: entity.id.uuid,
    });

    if (!engineer) return;

    engineer.name = entity.name;
    engineer.email = entity.email;
    engineer.password = entity.password.value;
    engineer.is_active = entity.isActive;
    engineer.updated_at = new Date();
    engineer.deleted_at = entity.deletedAt;

    if (entity.profilePicture) {
      const hasPicture = !!engineer.profile_picture;

      const pictureChanged =
        !hasPicture ||
        entity.profilePicture.name != engineer.profile_picture.name ||
        entity.profilePicture.location != engineer.profile_picture.location;

      if (pictureChanged) {
        engineer.profile_picture = ProfilePictureEntity.fromVo(
          entity.profilePicture,
          engineer.profile_picture?.id,
        );
      }
    }

    await this.ormRepository.save(engineer);

    if (entity.crea) {
      let crea = await this.creaRepository.findOneBy({
        engineer_id: entity.id.uuid,
      });
      if (!crea) {
        crea = CreaEntity.fromVo(entity.crea, entity.id.uuid);
      } else {
        crea.number = entity.crea.value;
      }
      await this.creaRepository.save(crea);
    }
  }

  async bulkUpdate(entities: Engineer[]): Promise<void> {
    throw new Error('Method not implemented.');
  }
  async delete(entity_id: EngineerId): Promise<void> {
    throw new Error('Method not implemented.');
  }
  async bulkDelete(entities_id: EngineerId[]): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async findById(entity_id: EngineerId): Promise<Engineer | null> {
    const engineer = await this.ormRepository.findOneBy({
      id: entity_id.uuid,
    });
    if (!engineer) return null;

    const crea = await this.creaRepository.findOneBy({
      engineer_id: engineer.id,
    });

    return EngineerEntityMapper.toDomain(engineer, {
      creaEntity: crea,
      needPassword: true,
    });
  }

  async findAll(): Promise<Engineer[]> {
    throw new Error('Method not implemented.');
  }

  async findByEmail(email: string): Promise<Engineer | null> {
    const engineer = await this.ormRepository.findOneBy({
      email,
    });
    if (!engineer) return null;

    const crea = await this.creaRepository.findOneBy({
      engineer_id: engineer.id,
    });

    return EngineerEntityMapper.toDomain(engineer, {
      creaEntity: crea,
      needPassword: false,
    });
  }

  async findByCrea(crea: CREA): Promise<Boolean> {
    if (!crea) return false;

    const existing = await this.creaRepository.findOneBy({
      number: crea.value,
    });

    return !!existing;
  }
}
