export interface ISendMailDTO {
  to: string;
  subject: string;
  variables: Record<string, unknown>;
  template: string;
}

export interface IMailProvider {
  sendMail(params: ISendMailDTO): Promise<void>;
}
