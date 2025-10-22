export class AssociateProducerCommand {
  public recipientEmail: string;
  public senderId: string;
  public authToken: string;

  constructor(recipientEmail: string, senderId: string, authToken: string) {
    if (!recipientEmail || !senderId) return;
    this.recipientEmail = recipientEmail;
    this.senderId = senderId;
    this.authToken = authToken;
  }
}
