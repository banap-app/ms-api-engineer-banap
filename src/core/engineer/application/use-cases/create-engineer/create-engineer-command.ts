import { ProfilePicture } from 'src/core/engineer/domain/profile-picture-vo';

export type CreateEngineerCommandProps = {
  name: string;
  email: string;
  password: string;
  profilePicture?: ProfilePicture | null;
  crea: string;
};

export class CreateEngineerCommand {
  public name: string;
  public email: string;
  public password: string;
  public profilePicture: ProfilePicture | null;
  public crea: string;

  constructor(props: CreateEngineerCommandProps) {
    if (!props) return;
    this.name = props.name;
    this.email = props.email;
    this.password = props.password;
    this.profilePicture = props.profilePicture ?? null;
    this.crea = props.crea;
  }
}
