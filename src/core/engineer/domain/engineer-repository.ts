import type { Repository } from '../../shared/domain/repository/repository.js';
import { CREA } from './crea-vo.js';
import type { Engineer, EngineerId } from './engineer.js';

export interface EngineerRepository extends Repository<Engineer, EngineerId> {
  findByEmail(email: string): Promise<Engineer>;
  findByCrea(crea: CREA): Promise<Boolean>;
}
