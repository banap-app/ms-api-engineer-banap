import { Entity } from '../../shared/domain/entity.js';
import { Uuid } from '../../shared/domain/value-objects/uuid-vo.js';
import { CREA } from './crea-vo.js';
import { EngineerValidatorFactory } from './engineer-validator.js';
import { Password } from './password-vo.js';

export enum UserType {
  NULL = 0,
  ENGINEER = 1,
  PRODUCER = 2,
}

export type EngineerConstructorProps = {
  engineerId?: EngineerId;
  name: string;
  email: string;
  password: Password;
  profilePicture?: string | null;
  crea: CREA;
  userType?: UserType;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
};

export type EngineerCreateProps = {
  name: string;
  email: string;
  password: string;
  profilePicture?: string | null;
  crea: string;
  userType?: UserType;
};

export class EngineerId extends Uuid {}

export class Engineer extends Entity {
  private engineerId: EngineerId;
  private name: string;
  private email: string;
  private password: Password;
  private profilePicture: string | null;
  private crea: CREA;
  private userType: UserType;
  private isActive: boolean;
  private createdAt: Date;
  private updatedAt: Date;
  private deletedAt: Date | null;

  constructor(props: EngineerConstructorProps) {
    super();
    this.engineerId = props.engineerId ?? new EngineerId();
    this.name = props.name;
    this.email = props.email;
    this.password = props.password;
    this.profilePicture = props.profilePicture ?? null;
    this.crea = props.crea;
    this.userType = props.userType ?? UserType.ENGINEER;
    this.isActive = props.isActive ?? true;
    this.createdAt = props.createdAt ?? new Date();
    this.updatedAt = props.updatedAt ?? new Date();
    this.deletedAt = props.deletedAt ?? null;
  }

  static create(props: EngineerCreateProps) {
    const password = Password.create(props.password);
    const crea = CREA.create(props.crea);

    const engineer = new Engineer({
      ...props,
      password,
      crea,
    });

    engineer.validate([]);

    return engineer;
  }

  public validate(fields?: string[]) {
    const engineerValidate = EngineerValidatorFactory.create();
    return engineerValidate.validate(this.notification, this, fields);
  }

  get id(): EngineerId {
    return this.engineerId;
  }

  toJSON() {
    return {
      engineerId: this.engineerId.uuid,
      name: this.name,
      email: this.email,
      profilePicture: this.profilePicture,
      userType: this.userType,
      isActive: this.isActive,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }
}
