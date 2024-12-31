import { MigrationInterface, QueryRunner } from "typeorm";

export class BlacklistAndPayment1735632376380 implements MigrationInterface {
    name = 'BlacklistAndPayment1735632376380'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "payment_history" ("id" SERIAL NOT NULL, "amount" integer NOT NULL, "description" character varying NOT NULL, "paymentDate" TIMESTAMP NOT NULL, "status" character varying NOT NULL, "userId" integer, CONSTRAINT "PK_5fcec51a769b65c0c3c0987f11c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."staff_role_enum" AS ENUM('ROLE_ADMIN', 'ROLE_RECEP', 'ROLE_USER')`);
        await queryRunner.query(`CREATE TABLE "staff" ("id" SERIAL NOT NULL, "password" character varying NOT NULL, "role" "public"."staff_role_enum" NOT NULL DEFAULT 'ROLE_USER', "name" character varying NOT NULL, "email" character varying NOT NULL, CONSTRAINT "UQ_902985a964245652d5e3a0f5f6a" UNIQUE ("email"), CONSTRAINT "PK_e4ee98bb552756c180aec1e854a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "blacklist" ("id" SERIAL NOT NULL, "reason" character varying, "bannedAt" TIMESTAMP NOT NULL, CONSTRAINT "PK_04dc42a96bf0914cda31b579702" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "role"`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "isActive" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "user" ADD "peachCoin" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "user" ADD "peachPoint" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "payment_history" ADD CONSTRAINT "FK_34d643de1a588d2350297da5c24" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment_history" DROP CONSTRAINT "FK_34d643de1a588d2350297da5c24"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "peachPoint"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "peachCoin"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isActive"`);
        await queryRunner.query(`CREATE TYPE "public"."user_role_enum" AS ENUM('ROLE_ADMIN', 'ROLE_USER')`);
        await queryRunner.query(`ALTER TABLE "user" ADD "role" "public"."user_role_enum" NOT NULL DEFAULT 'ROLE_USER'`);
        await queryRunner.query(`DROP TABLE "blacklist"`);
        await queryRunner.query(`DROP TABLE "staff"`);
        await queryRunner.query(`DROP TYPE "public"."staff_role_enum"`);
        await queryRunner.query(`DROP TABLE "payment_history"`);
    }

}
