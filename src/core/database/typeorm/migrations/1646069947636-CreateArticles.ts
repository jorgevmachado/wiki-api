import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateArticles1646069947636 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
        await queryRunner.createTable(
            new Table({
                name: 'articles',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                    },
                    {
                        name: 'description',
                        type: 'varchar',
                        length: '1000'
                    },
                    {
                        name: 'image_url',
                        type: 'varchar',
                        length: '1000',
                        isNullable: true
                    },
                    {
                        name: 'content',
                        type: 'bytea',
                    },
                    {
                        name: 'user_id',
                        type: 'uuid',
                    },
                    {
                        name: 'category_id',
                        type: 'uuid',
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp with time zone',
                        default: 'now()',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp with time zone',
                        isNullable: true,
                    },
                    {
                        name: 'deleted_at',
                        type: 'timestamp with time zone',
                        isNullable: true,
                    },
                ],
                foreignKeys: [
                    {
                        name: 'ParentUserId',
                        referencedTableName: 'users',
                        referencedColumnNames: ['id'],
                        columnNames: ['user_id'],
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE',
                    },
                    {
                        name: 'ParentCategoryId',
                        referencedTableName: 'categories',
                        referencedColumnNames: ['id'],
                        columnNames: ['category_id'],
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE',
                    }
                ]
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('articles');
    }

}
