import { MigrationInterface, QueryRunner } from "typeorm";

export class BlacklistAndPaymentRelation1735632664327 implements MigrationInterface {
    name = 'BlacklistAndPaymentRelation1735632664327'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment_history" ADD "bookingId" integer`);
        await queryRunner.query(`ALTER TABLE "blacklist" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "blacklist" ADD CONSTRAINT "UQ_53c1ab62c3e5875bc3ac474823e" UNIQUE ("userId")`);
        await queryRunner.query(`ALTER TABLE "payment_history" ADD CONSTRAINT "FK_8799ccb4b093b6880d8cef9ec6e" FOREIGN KEY ("bookingId") REFERENCES "booking"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "blacklist" ADD CONSTRAINT "FK_53c1ab62c3e5875bc3ac474823e" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "blacklist" DROP CONSTRAINT "FK_53c1ab62c3e5875bc3ac474823e"`);
        await queryRunner.query(`ALTER TABLE "payment_history" DROP CONSTRAINT "FK_8799ccb4b093b6880d8cef9ec6e"`);
        await queryRunner.query(`ALTER TABLE "blacklist" DROP CONSTRAINT "UQ_53c1ab62c3e5875bc3ac474823e"`);
        await queryRunner.query(`ALTER TABLE "blacklist" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "payment_history" DROP COLUMN "bookingId"`);
    }

}
