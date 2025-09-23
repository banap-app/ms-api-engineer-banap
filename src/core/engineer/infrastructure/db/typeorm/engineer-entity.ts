import { CREA } from 'src/core/engineer/domain/crea-vo';
import {
  EngineerConstructorProps,
  UserType,
} from 'src/core/engineer/domain/engineer';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('crea')
export class CreaEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  number: string;

  get stateCode(): string {
    return this.number.split('-')[1];
  }

  static fromVo(vo: CREA): CreaEntity {
    const entity = new CreaEntity();
    entity.number = vo.value;
    return entity;
  }

  toVo(): CREA {
    return CREA.createWithValidation(this.number);
  }
}

@Entity('users')
export class EngineerEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'text' })
  password: string;

  @Column({ type: 'text', nullable: true })
  profile_picture: string;

  @OneToOne(() => CreaEntity, { cascade: true })
  @JoinColumn({ name: 'crea_id' })
  crea: CreaEntity;

  @Column({ type: 'enum', enum: UserType, default: UserType.ENGINEER })
  user_type: UserType;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  deleted_at: Date;

  static fromDomain(props: EngineerConstructorProps): EngineerEntity {
    const entity = new EngineerEntity();
    entity.id = props.engineerId.uuid;
    entity.name = props.name;
    entity.email = props.email;
    entity.password = props.password.value;
    entity.profile_picture = props.profilePicture;
    entity.crea = CreaEntity.fromVo(props.crea);
    entity.is_active = props.isActive;
    entity.created_at = props.createdAt;
    entity.updated_at = props.updatedAt;
    entity.deleted_at = props.deletedAt;

    return entity;
  }
}
