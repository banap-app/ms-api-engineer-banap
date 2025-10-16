export class AssociateProducerCommand {
  public recipientEmail: string;
  public senderId: string;

  constructor(recipientEmail: string, senderId: string) {
    if (!recipientEmail || !senderId) return;
    this.recipientEmail = recipientEmail;
    this.senderId = senderId;
  }
}
