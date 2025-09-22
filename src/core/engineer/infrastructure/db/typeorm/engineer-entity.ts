import { CREA } from 'src/core/engineer/domain/crea-vo';
import {
  EngineerConstructorProps,
  UserType,
} from 'src/core/engineer/domain/engineer';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('user_types')
export class UserTypeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', unique: true })
  type: UserType;

  @Column()
  display_name: string;

  @Column({ type: 'simple-array' })
  required_fields: string[];
}

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

  @OneToOne(() => CreaEntity, { nullable: true })
  @JoinColumn({ name: 'crea_id' })
  crea: CreaEntity | null;

  @ManyToOne(() => UserTypeEntity, {
    eager: true,
  })
  @JoinColumn({ name: 'user_type_id' })
  user_type: UserTypeEntity;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @Column({ type: 'timestamp', default: 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: 'CURRENT_TIMESTAMP' })
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
    entity.crea = props.crea ? CreaEntity.fromVo(props.crea) : null;
    entity.is_active = props.isActive;
    entity.created_at = props.createdAt;
    entity.updated_at = props.updatedAt;
    entity.deleted_at = props.deletedAt;

    return entity;
  }
}
