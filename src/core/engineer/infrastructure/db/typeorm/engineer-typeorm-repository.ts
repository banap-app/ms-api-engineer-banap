import { CREA } from 'src/core/engineer/domain/crea-vo';
import { Engineer, EngineerId } from 'src/core/engineer/domain/engineer';
import { EngineerRepository } from 'src/core/engineer/domain/engineer-repository';
import { Repository } from 'typeorm';
import { CreaEntity, EngineerEntity } from './engineer-entity';
import { EngineerEntityMapper } from './engineer-entity-mapper';

export class EngineerTypeOrmRepository implements EngineerRepository {
  private ormRepository: Repository<EngineerEntity>;
  constructor(ormRepository: Repository<EngineerEntity>) {
    this.ormRepository = ormRepository;
  }

  async insert(entity: Engineer): Promise<void> {
    const engineer = EngineerEntityMapper.toEntity(entity);
    await this.ormRepository.save(engineer);
  }

  async bulkInsert(entities: Engineer[]): Promise<void> {
    throw new Error('Method not implemented.');
  }
  async update(entity: Engineer): Promise<void> {
    const engineer = await this.ormRepository.findOne({
      where: { id: entity.id.uuid },
      relations: ['crea'],
    });

    if (!engineer) return;

    if (entity.crea) {
      engineer.crea.number = entity.crea.value;
    }

    engineer.name = entity.name;
    engineer.email = entity.email;
    engineer.password = entity.password.value;
    engineer.profile_picture = entity.profilePicture;
    engineer.is_active = entity.isActive;
    engineer.updated_at = new Date();
    engineer.deleted_at = entity.deletedAt;

    await this.ormRepository.save(engineer);
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
    const engineer = await this.ormRepository.findOne({
      where: { id: entity_id.uuid },
      relations: ['crea'],
    });
    if (!engineer) return null;
    return EngineerEntityMapper.toDomain(engineer, { needPassword: true });
  }
  async findAll(): Promise<Engineer[]> {
    throw new Error('Method not implemented.');
  }

  async findByEmail(email: string): Promise<Engineer | null> {
    const engineer = await this.ormRepository.findOne({
      where: { email },
      relations: ['crea'],
    });

    if (!engineer) {
      return null;
    }

    return EngineerEntityMapper.toDomain(engineer);
  }

  async findByCrea(crea: CREA): Promise<Boolean> {
    if (!crea) return false;

    const engineer = await this.ormRepository.findOne({
      where: { crea: { number: crea.value } },
      relations: ['crea'],
    });

    if (!engineer) {
      return false;
    }

    return true;
  }
}
