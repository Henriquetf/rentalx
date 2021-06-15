import fs from 'fs';

import { SES } from 'aws-sdk';
import handlebars from 'handlebars';
import { createTransport, Transporter } from 'nodemailer';
import { injectable } from 'tsyringe';

import { IMailProvider, ISendMailDTO } from '../IMailProvider';

@injectable()
export class SESMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    this.client = createTransport({
      SES: new SES({
        apiVersion: '2010-12-01',
        region: process.env.AWS_SES_REGION,
      }),
    });
  }

  async sendMail({ subject, to, template, variables }: ISendMailDTO): Promise<void> {
    const templateFileContent = fs.readFileSync(template).toString('utf-8');

    const templateParse = handlebars.compile(templateFileContent);

    const templateHTML = templateParse(variables);

    await this.client.sendMail({
      to,
      from: `Retalx <${process.env.AWS_SES_EMAIL || ''}>`,
      subject,
      html: templateHTML,
    });
  }
}
