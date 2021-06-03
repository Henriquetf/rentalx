import { IMailProvider, ISendMailDTO } from '../IMailProvider';

export class MailProviderInMemory implements IMailProvider {
  private messages: ISendMailDTO[] = [];

  // eslint-disable-next-line @typescript-eslint/require-await
  async sendMail(params: ISendMailDTO): Promise<void> {
    this.messages.push(params);
  }
}
