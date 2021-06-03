import { createTestAccount, createTransport, Transporter } from 'nodemailer';
import { injectable } from 'tsyringe';

@injectable()
export class TestAccountClient {
  private client?: Transporter;

  async getClient(): Promise<Transporter> {
    if (!this.client) {
      const account = await createTestAccount();

      const transporter = createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });

      this.client = transporter;
    }

    return this.client;
  }
}
