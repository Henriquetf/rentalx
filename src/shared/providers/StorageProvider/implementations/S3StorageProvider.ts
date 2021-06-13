import fs from 'fs';

import { S3 } from 'aws-sdk';
import mime from 'mime';

import { getTempStoragePath } from '@config/upload';

import { deleteFile } from '@shared/utils/file';

import { IStorageProvider } from '../IStorageProvider';

export class S3StorageProvider implements IStorageProvider {
  private client: S3;

  constructor() {
    this.client = new S3({
      region: process.env.AWS_BUCKET_REGION,
    });
  }

  async save(file: string, folder: string): Promise<string> {
    const tempPath = getTempStoragePath(folder, file);

    const fileContent = await fs.promises.readFile(tempPath);
    const contentType = mime.getType(tempPath);

    await this.client
      .putObject({
        Bucket: this.getBucket(folder),
        Key: file,
        ACL: 'public-read',
        Body: fileContent,
        ContentType: contentType || undefined,
      })
      .promise();

    await deleteFile(tempPath);

    return file;
  }

  async delete(file: string, folder: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: this.getBucket(folder),
        Key: file,
      })
      .promise();
  }

  private getBucket(folder: string) {
    if (!process.env.AWS_BUCKET_NAME) {
      throw new Error('S3 bucket name is empty.');
    }

    return `${process.env.AWS_BUCKET_NAME}/${folder}`;
  }
}
