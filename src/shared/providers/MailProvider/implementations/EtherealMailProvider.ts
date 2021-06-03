/* eslint-disable no-console */
import fs from 'fs';

import handlebars from 'handlebars';
import { getTestMessageUrl } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { inject, injectable } from 'tsyringe';

import { IMailProvider, ISendMailDTO } from '../IMailProvider';
import { TestAccountClient } from './TestAccountClient';

@injectable()
export class EtherealMailProvider implements IMailProvider {
  constructor(
    @inject('AccountClient')
    private accountClient: TestAccountClient,
  ) {}

  async sendMail({ subject, to, template, variables }: ISendMailDTO): Promise<void> {
    const templateFileContent = fs.readFileSync(template).toString('utf-8');

    const templateParse = handlebars.compile(templateFileContent);

    const templateHTML = templateParse(variables);

    const client = await this.accountClient.getClient();

    const message = (await client.sendMail({
      to,
      from: 'Retalx <noreply@rentalx.com>',
      subject,
      html: templateHTML,
    })) as SMTPTransport.SentMessageInfo;

    console.log('Message sent: %s', message.messageId);
    console.log('Preview URL: %s', getTestMessageUrl(message));
  }
}
