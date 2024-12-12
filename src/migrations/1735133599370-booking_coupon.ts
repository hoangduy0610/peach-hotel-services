import { MigrationInterface, QueryRunner } from "typeorm";

export class BookingCoupon1735133599370 implements MigrationInterface {
    name = 'BookingCoupon1735133599370'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "booking" ADD "couponId" integer`);
        await queryRunner.query(`ALTER TABLE "booking" ADD CONSTRAINT "FK_52330efcc8349a4bd192d7b19ad" FOREIGN KEY ("couponId") REFERENCES "coupon"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "booking" DROP CONSTRAINT "FK_52330efcc8349a4bd192d7b19ad"`);
        await queryRunner.query(`ALTER TABLE "booking" DROP COLUMN "couponId"`);
    }

}
