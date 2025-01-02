import { MigrationInterface, QueryRunner } from "typeorm";

export class UserAddPhoneAndAddress1735632808371 implements MigrationInterface {
    name = 'UserAddPhoneAndAddress1735632808371'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "address" character varying NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "user" ADD "phone" character varying NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "staff" ADD "address" character varying NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "staff" ADD "phone" character varying NOT NULL DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "staff" DROP COLUMN "phone"`);
        await queryRunner.query(`ALTER TABLE "staff" DROP COLUMN "address"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "phone"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "address"`);
    }

}
