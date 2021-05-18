import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

const tableName = 'users';
const newColumnName = 'avatar';

export class AlterUserAddAvatar1621297883776 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      tableName,
      new TableColumn({
        name: newColumnName,
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn(tableName, newColumnName);
  }
}
