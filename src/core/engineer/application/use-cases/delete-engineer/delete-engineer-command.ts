export class DeleteEngineerCommand {
  public engineerId: string;

  constructor(engineerId: string) {
    if (!engineerId) return;
    this.engineerId = engineerId;
  }
}
