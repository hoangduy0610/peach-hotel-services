import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDb1732670486488 implements MigrationInterface {
    name = 'InitDb1732670486488'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "room_tier" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "type" character varying NOT NULL, "description" character varying NOT NULL, "slot" integer NOT NULL, "available" integer NOT NULL, "capacity" integer NOT NULL, CONSTRAINT "PK_aebe147a4c15553519629d9ed25" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "room" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "floor" integer NOT NULL, "price" integer NOT NULL, "isBalcony" boolean NOT NULL, "isBathroom" boolean NOT NULL, "isAirConditioner" boolean NOT NULL, "isFreeWifi" boolean NOT NULL, "isTelevision" boolean NOT NULL, "isRefrigerator" boolean NOT NULL, "isBreakfast" boolean NOT NULL, "isLunch" boolean NOT NULL, "isDinner" boolean NOT NULL, "isSnack" boolean NOT NULL, "isDrink" boolean NOT NULL, "isParking" boolean NOT NULL, "isSwimmingPool" boolean NOT NULL, "isGym" boolean NOT NULL, "isSpa" boolean NOT NULL, "isLaundry" boolean NOT NULL, "isCarRental" boolean NOT NULL, "isBusService" boolean NOT NULL, "roomTierId" integer, CONSTRAINT "PK_c6d46db005d623e691b2fbcba23" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "service_tier" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "type" character varying NOT NULL, "description" character varying NOT NULL, "slot" integer NOT NULL, "available" integer NOT NULL, CONSTRAINT "PK_31c676912d559e7abfa57ae4409" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "service" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "price" integer NOT NULL, "serviceTierId" integer, CONSTRAINT "PK_85a21558c006647cd76fdce044b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "booking" ("id" SERIAL NOT NULL, "reservationCode" character varying NOT NULL, "customerName" character varying NOT NULL, "customerPhone" character varying NOT NULL, "checkIn" TIMESTAMP NOT NULL, "checkOut" TIMESTAMP NOT NULL, "total" integer NOT NULL, "status" character varying NOT NULL, "userId" integer, CONSTRAINT "PK_49171efc69702ed84c812f33540" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "rating" ("id" SERIAL NOT NULL, "score" integer NOT NULL, "comment" character varying NOT NULL, "userId" integer, "roomId" integer, "serviceId" integer, CONSTRAINT "PK_ecda8ad32645327e4765b43649e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "promote" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "discount" integer NOT NULL, "type" character varying NOT NULL, "startAt" TIMESTAMP NOT NULL, "endAt" TIMESTAMP NOT NULL, CONSTRAINT "PK_fc194ef1094ec9617098a34c009" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "coupon" ("id" SERIAL NOT NULL, "code" character varying NOT NULL, "status" character varying NOT NULL, "promoteId" integer, "userId" integer, CONSTRAINT "PK_fcbe9d72b60eed35f46dc35a682" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."user_role_enum" AS ENUM('ROLE_ADMIN', 'ROLE_USER')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "password" character varying NOT NULL, "role" "public"."user_role_enum" NOT NULL DEFAULT 'ROLE_USER', "name" character varying NOT NULL, "email" character varying NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "room" ADD CONSTRAINT "FK_81cc59b5b5aa0ecebe705ed68d2" FOREIGN KEY ("roomTierId") REFERENCES "room_tier"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "service" ADD CONSTRAINT "FK_59c89e19cef6920052f4632c64a" FOREIGN KEY ("serviceTierId") REFERENCES "service_tier"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "booking" ADD CONSTRAINT "FK_336b3f4a235460dc93645fbf222" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rating" ADD CONSTRAINT "FK_a6c53dfc89ba3188b389ef29a62" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rating" ADD CONSTRAINT "FK_6f0b6108d6f057709003dc86d73" FOREIGN KEY ("roomId") REFERENCES "room"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rating" ADD CONSTRAINT "FK_3462e3638471c356591d5926309" FOREIGN KEY ("serviceId") REFERENCES "service"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "coupon" ADD CONSTRAINT "FK_621a43003afcc64d9c96091e1d4" FOREIGN KEY ("promoteId") REFERENCES "promote"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "coupon" ADD CONSTRAINT "FK_03de14bf5e5b4410fced2ca9935" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coupon" DROP CONSTRAINT "FK_03de14bf5e5b4410fced2ca9935"`);
        await queryRunner.query(`ALTER TABLE "coupon" DROP CONSTRAINT "FK_621a43003afcc64d9c96091e1d4"`);
        await queryRunner.query(`ALTER TABLE "rating" DROP CONSTRAINT "FK_3462e3638471c356591d5926309"`);
        await queryRunner.query(`ALTER TABLE "rating" DROP CONSTRAINT "FK_6f0b6108d6f057709003dc86d73"`);
        await queryRunner.query(`ALTER TABLE "rating" DROP CONSTRAINT "FK_a6c53dfc89ba3188b389ef29a62"`);
        await queryRunner.query(`ALTER TABLE "booking" DROP CONSTRAINT "FK_336b3f4a235460dc93645fbf222"`);
        await queryRunner.query(`ALTER TABLE "service" DROP CONSTRAINT "FK_59c89e19cef6920052f4632c64a"`);
        await queryRunner.query(`ALTER TABLE "room" DROP CONSTRAINT "FK_81cc59b5b5aa0ecebe705ed68d2"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
        await queryRunner.query(`DROP TABLE "coupon"`);
        await queryRunner.query(`DROP TABLE "promote"`);
        await queryRunner.query(`DROP TABLE "rating"`);
        await queryRunner.query(`DROP TABLE "booking"`);
        await queryRunner.query(`DROP TABLE "service"`);
        await queryRunner.query(`DROP TABLE "service_tier"`);
        await queryRunner.query(`DROP TABLE "room"`);
        await queryRunner.query(`DROP TABLE "room_tier"`);
    }

}
