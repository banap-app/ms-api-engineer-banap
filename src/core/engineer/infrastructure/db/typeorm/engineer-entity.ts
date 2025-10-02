import { CREA } from 'src/core/engineer/domain/crea-vo';
import {
  EngineerConstructorProps,
  UserType,
} from 'src/core/engineer/domain/engineer';
import { ProfilePicture } from 'src/core/engineer/domain/profile-picture-vo';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('profile_picture')
export class ProfilePictureEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  location: string;

  static fromVo(vo: ProfilePicture): ProfilePictureEntity {
    const entity = new ProfilePictureEntity();
    entity.name = vo.name;
    entity.location = vo.location;
    return entity;
  }
}

@Entity('crea')
export class CreaEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  number: string;

  @Column({ type: 'uuid', unique: true })
  engineer_id: string;

  get stateCode(): string {
    return this.number.split('-')[1];
  }

  static fromVo(vo: CREA, engineerId): CreaEntity {
    const entity = new CreaEntity();
    entity.number = vo.value;
    entity.engineer_id = engineerId;
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

  @Column({ name: 'profile_picture_id', type: 'uuid', nullable: true })
  profile_picture_id: string;

  @OneToOne(() => ProfilePictureEntity, {
    cascade: true,
    eager: true,
    nullable: true,
  })
  @JoinColumn({ name: 'profile_picture_id' })
  profile_picture: ProfilePictureEntity;

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
    entity.is_active = props.isActive;
    entity.created_at = props.createdAt;
    entity.updated_at = props.updatedAt;
    entity.deleted_at = props.deletedAt;

    if (props.profilePicture) {
      const pp = ProfilePictureEntity.fromVo(props.profilePicture);
      entity.profile_picture = pp;
    }

    return entity;
  }
}
