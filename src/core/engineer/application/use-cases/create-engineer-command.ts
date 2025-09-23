export type CreateEngineerCommandProps = {
  name: string;
  email: string;
  password: string;
  profilePicture?: string;
  crea: string;
};

export class CreateEngineerCommand {
  public name: string;
  public email: string;
  public password: string;
  public profilePicture: string;
  public crea: string;

  constructor(props: CreateEngineerCommandProps) {
    if (!props) return;
    this.name = props.name;
    this.email = props.email;
    this.password = props.password;
    this.profilePicture = props.profilePicture;
    this.crea = props.crea;
  }
}
