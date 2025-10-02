import { ProfilePicture } from 'src/core/engineer/domain/profile-picture-vo';

export type UpdateEngineerCommandProps = {
  engineerId: string;
  name?: string;
  email?: string;
  password?: string;
  profilePicture?: ProfilePicture | null;
  crea?: string;
};

export class UpdateEngineerCommand {
  public engineerId: string;
  public name?: string;
  public email?: string;
  public password?: string;
  public profilePicture?: ProfilePicture | null;
  public crea?: string;

  constructor(props: UpdateEngineerCommandProps) {
    if (!props) return;
    this.engineerId = props.engineerId;
    this.name = props.name;
    this.email = props.email;
    this.password = props.password;
    this.profilePicture = props.profilePicture ?? null;
    this.crea = props.crea;
  }
}
