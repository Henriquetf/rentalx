import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

const tableName = 'specifications_cars';

export class CreateSpecificationsCars1622296828426 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: tableName,
        columns: [
          {
            name: 'car_id',
            type: 'uuid',
          },
          {
            name: 'specification_id',
            type: 'uuid',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      tableName,
      new TableForeignKey({
        name: 'FK_specification_car',
        columnNames: ['specification_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'specifications',
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL',
      }),
    );

    await queryRunner.createForeignKey(
      tableName,
      new TableForeignKey({
        name: 'FK_car_specification',
        columnNames: ['car_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'cars',
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(tableName, 'FK_specification_car');
    await queryRunner.dropForeignKey(tableName, 'FK_car_specification');
    await queryRunner.dropTable(tableName);
  }
}
