import { Engineer, EngineerId } from 'src/core/engineer/domain/engineer';
import { EngineerRepository } from 'src/core/engineer/domain/engineer-repository';
import { Repository } from 'typeorm';
import { EngineerEntity } from './engineer-entity';
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
    throw new Error('Method not implemented.');
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
  async findById(entity_id: EngineerId): Promise<Engineer> {
    throw new Error('Method not implemented.');
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
}
