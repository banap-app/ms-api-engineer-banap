import { Entity } from '../../shared/domain/entity.js';
import { Uuid } from '../../shared/domain/value-objects/uuid-vo.js';
import { CREA } from './crea-vo.js';
import { EngineerValidatorFactory } from './engineer-validator.js';
import { Password } from './password-vo.js';

export enum UserType {
  ADMIN = 0,
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
  private readonly _engineerId: EngineerId;
  private _name: string;
  private _email: string;
  private _password: Password;
  private _profilePicture: string | null;
  private _crea: CREA;
  private _userType: UserType;
  private _isActive: boolean;
  private _createdAt: Date;
  private _updatedAt: Date;
  private _deletedAt: Date | null;

  constructor(props: EngineerConstructorProps) {
    super();
    this._engineerId = props.engineerId ?? new EngineerId();
    this._name = props.name;
    this._email = props.email;
    this._password = props.password;
    this._profilePicture = props.profilePicture ?? null;
    this._crea = props.crea;
    this._userType = props.userType ?? UserType.ENGINEER;
    this._isActive = props.isActive ?? true;
    this._createdAt = props.createdAt ?? new Date();
    this._updatedAt = props.updatedAt ?? new Date();
    this._deletedAt = props.deletedAt ?? null;
  }

  static create(props: EngineerCreateProps) {
    const [password, passwordError] = Password.create(props.password).toTuple();
    const [crea, creaError] = CREA.create(props.crea).toTuple();

    // if (!password) {
    //   throw new InvalidPasswordError('Password is required');
    // }
    // if (!crea) {
    //   throw new InvalidCREAError('CREA is required');
    // }

    const engineer = new Engineer({
      ...props,
      password,
      crea,
    });

    if (passwordError) {
      engineer.notification.addError(passwordError.message, 'password');
    }

    if (creaError) {
      engineer.notification.addError(creaError.message, 'crea');
    }

    engineer.validate([]);

    return engineer;
  }

  public validate(fields?: string[]) {
    const engineerValidate = EngineerValidatorFactory.create();
    return engineerValidate.validate(this.notification, this, fields);
  }

  public activate() {
    this._isActive = true;
    this._deletedAt = null;
  }

  public deactivate() {
    this._isActive = false;
    if (this._deletedAt == null) {
      this._deletedAt = new Date();
    }
  }

  get id(): EngineerId {
    return this._engineerId;
  }

  get name(): string {
    return this._name;
  }

  get email(): string {
    return this._email;
  }

  get password(): Password {
    return this._password;
  }

  get profilePicture(): string | null {
    return this._profilePicture;
  }

  get crea(): CREA {
    return this._crea;
  }

  get userType(): UserType {
    return this._userType;
  }

  get isActive(): boolean {
    return this._isActive;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  get deletedAt(): Date | null {
    return this._deletedAt;
  }

  public changeName(name: string) {
    this._name = name;
    this._updatedAt = new Date();
    this.validate([]);
  }

  public changeEmail(email: string) {
    this._email = email;
    this._updatedAt = new Date();
    this.validate([]);
  }

  public changeHashedPassword(hashedPassword: string) {
    this._password = Password.hashPassword(hashedPassword);
    this._updatedAt = new Date();
  }

  public changeProfilePicture(profilePicture: string) {
    this._profilePicture = profilePicture;
    this._updatedAt = new Date();
  }

  public changeCrea(newCrea: string) {
    const [crea, creaError] = CREA.create(newCrea).toTuple();

    if (creaError) {
      this.notification.addError(creaError.message, 'crea');
    }

    this._crea = crea;
    this._updatedAt = new Date();
  }

  toJSON() {
    return {
      engineerId: this._engineerId.uuid,
      name: this._name,
      email: this._email,
      profilePicture: this._profilePicture,
      crea: this._crea.value,
      userType: this._userType,
      isActive: this._isActive,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
      deletedAt: this._deletedAt,
    };
  }
}
