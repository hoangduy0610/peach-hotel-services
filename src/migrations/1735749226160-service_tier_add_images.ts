import { MigrationInterface, QueryRunner } from "typeorm";

export class ServiceTierAddImages1735749226160 implements MigrationInterface {
    name = 'ServiceTierAddImages1735749226160'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "room_tier" ADD "images" text array NOT NULL DEFAULT '{}'`);
        await queryRunner.query(`ALTER TABLE "service_tier" ADD "images" text array NOT NULL DEFAULT '{}'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "service_tier" DROP COLUMN "images"`);
        await queryRunner.query(`ALTER TABLE "room_tier" DROP COLUMN "images"`);
    }

}
