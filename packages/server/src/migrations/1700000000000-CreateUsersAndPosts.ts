import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsersAndPosts1700000000000 implements MigrationInterface {
    name = 'CreateUsersAndPosts1700000000000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Создаем таблицу users
        await queryRunner.query(`
            CREATE TABLE "users" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "avatar" character varying,
                "firstName" character varying(100) NOT NULL,
                "lastName" character varying(100) NOT NULL,
                "birthDate" date,
                "about" text,
                "email" character varying NOT NULL,
                "phone" character varying,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_users_email" UNIQUE ("email"),
                CONSTRAINT "PK_users" PRIMARY KEY ("id")
            )
        `);

        // Создаем таблицу posts
        await queryRunner.query(`
            CREATE TABLE "posts" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "content" text NOT NULL,
                "images" text,
                "publishDate" TIMESTAMP NOT NULL DEFAULT now(),
                "userId" uuid NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_posts" PRIMARY KEY ("id")
            )
        `);

        // Добавляем внешний ключ
        await queryRunner.query(`
            ALTER TABLE "posts" 
            ADD CONSTRAINT "FK_posts_users" 
            FOREIGN KEY ("userId") 
            REFERENCES "users"("id") 
            ON DELETE CASCADE
        `);

        // Добавляем индексы для производительности
        await queryRunner.query(`
            CREATE INDEX "IDX_posts_userId" ON "posts" ("userId")
        `);
        
        await queryRunner.query(`
            CREATE INDEX "IDX_posts_publishDate" ON "posts" ("publishDate")
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Удаляем внешний ключ
        await queryRunner.query(`
            ALTER TABLE "posts" DROP CONSTRAINT "FK_posts_users"
        `);
        
        // Удаляем индексы
        await queryRunner.query(`DROP INDEX "IDX_posts_userId"`);
        await queryRunner.query(`DROP INDEX "IDX_posts_publishDate"`);
        
        // Удаляем таблицы
        await queryRunner.query(`DROP TABLE "posts"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }
}