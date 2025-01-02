import { MigrationInterface, QueryRunner } from "typeorm";

export class BookingAppliedPeach1735795309379 implements MigrationInterface {
    name = 'BookingAppliedPeach1735795309379'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "booking" ADD "peachCoinApplied" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "booking" DROP COLUMN "peachCoinApplied"`);
    }

}
