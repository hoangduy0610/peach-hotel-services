import { MigrationInterface, QueryRunner } from "typeorm";

export class BookingCheckinCheckout1735830381396 implements MigrationInterface {
    name = 'BookingCheckinCheckout1735830381396'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "booking" ADD "realCheckIn" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "booking" ADD "realCheckOut" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "booking" DROP COLUMN "realCheckOut"`);
        await queryRunner.query(`ALTER TABLE "booking" DROP COLUMN "realCheckIn"`);
    }

}
