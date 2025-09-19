import type { Entity } from '../entity.js';
import type { Uuid } from '../value-objects/uuid-vo.js';

export interface Repository<E extends Entity, ID extends Uuid> {
  insert(entity: E): Promise<void>;
  bulkInsert(entities: E[]): Promise<void>;
  update(entity: E): Promise<void>;
  bulkUpdate(entities: E[]): Promise<void>;
  delete(entity_id: ID): Promise<void>;
  bulkDelete(entities_id: ID[]): Promise<void>;
  findById(entity_id: ID): Promise<E>;
  findAll(): Promise<E[]>;
}
