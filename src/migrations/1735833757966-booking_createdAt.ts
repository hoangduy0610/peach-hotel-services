import { MigrationInterface, QueryRunner } from "typeorm";

export class BookingCreatedAt1735833757966 implements MigrationInterface {
    name = 'BookingCreatedAt1735833757966'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "booking" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "booking" DROP COLUMN "createdAt"`);
    }

}
