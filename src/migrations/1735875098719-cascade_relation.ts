import { MigrationInterface, QueryRunner } from "typeorm";

export class CascadeRelation1735875098719 implements MigrationInterface {
    name = 'CascadeRelation1735875098719'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "room" DROP CONSTRAINT "FK_81cc59b5b5aa0ecebe705ed68d2"`);
        await queryRunner.query(`ALTER TABLE "service" DROP CONSTRAINT "FK_59c89e19cef6920052f4632c64a"`);
        await queryRunner.query(`ALTER TABLE "coupon" DROP CONSTRAINT "FK_621a43003afcc64d9c96091e1d4"`);
        await queryRunner.query(`ALTER TABLE "coupon" DROP CONSTRAINT "FK_03de14bf5e5b4410fced2ca9935"`);
        await queryRunner.query(`ALTER TABLE "payment_history" DROP CONSTRAINT "FK_34d643de1a588d2350297da5c24"`);
        await queryRunner.query(`ALTER TABLE "payment_history" DROP CONSTRAINT "FK_8799ccb4b093b6880d8cef9ec6e"`);
        await queryRunner.query(`ALTER TABLE "booking" DROP CONSTRAINT "FK_336b3f4a235460dc93645fbf222"`);
        await queryRunner.query(`ALTER TABLE "rating" DROP CONSTRAINT "FK_a6c53dfc89ba3188b389ef29a62"`);
        await queryRunner.query(`ALTER TABLE "rating" DROP CONSTRAINT "FK_6f0b6108d6f057709003dc86d73"`);
        await queryRunner.query(`ALTER TABLE "rating" DROP CONSTRAINT "FK_3462e3638471c356591d5926309"`);
        await queryRunner.query(`ALTER TABLE "blacklist" DROP CONSTRAINT "FK_53c1ab62c3e5875bc3ac474823e"`);
        await queryRunner.query(`ALTER TABLE "room" ADD CONSTRAINT "FK_81cc59b5b5aa0ecebe705ed68d2" FOREIGN KEY ("roomTierId") REFERENCES "room_tier"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "service" ADD CONSTRAINT "FK_59c89e19cef6920052f4632c64a" FOREIGN KEY ("serviceTierId") REFERENCES "service_tier"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "coupon" ADD CONSTRAINT "FK_621a43003afcc64d9c96091e1d4" FOREIGN KEY ("promoteId") REFERENCES "promote"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "coupon" ADD CONSTRAINT "FK_03de14bf5e5b4410fced2ca9935" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payment_history" ADD CONSTRAINT "FK_34d643de1a588d2350297da5c24" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payment_history" ADD CONSTRAINT "FK_8799ccb4b093b6880d8cef9ec6e" FOREIGN KEY ("bookingId") REFERENCES "booking"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "booking" ADD CONSTRAINT "FK_336b3f4a235460dc93645fbf222" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rating" ADD CONSTRAINT "FK_a6c53dfc89ba3188b389ef29a62" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rating" ADD CONSTRAINT "FK_6f0b6108d6f057709003dc86d73" FOREIGN KEY ("roomId") REFERENCES "room"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rating" ADD CONSTRAINT "FK_3462e3638471c356591d5926309" FOREIGN KEY ("serviceId") REFERENCES "service"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "blacklist" ADD CONSTRAINT "FK_53c1ab62c3e5875bc3ac474823e" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "blacklist" DROP CONSTRAINT "FK_53c1ab62c3e5875bc3ac474823e"`);
        await queryRunner.query(`ALTER TABLE "rating" DROP CONSTRAINT "FK_3462e3638471c356591d5926309"`);
        await queryRunner.query(`ALTER TABLE "rating" DROP CONSTRAINT "FK_6f0b6108d6f057709003dc86d73"`);
        await queryRunner.query(`ALTER TABLE "rating" DROP CONSTRAINT "FK_a6c53dfc89ba3188b389ef29a62"`);
        await queryRunner.query(`ALTER TABLE "booking" DROP CONSTRAINT "FK_336b3f4a235460dc93645fbf222"`);
        await queryRunner.query(`ALTER TABLE "payment_history" DROP CONSTRAINT "FK_8799ccb4b093b6880d8cef9ec6e"`);
        await queryRunner.query(`ALTER TABLE "payment_history" DROP CONSTRAINT "FK_34d643de1a588d2350297da5c24"`);
        await queryRunner.query(`ALTER TABLE "coupon" DROP CONSTRAINT "FK_03de14bf5e5b4410fced2ca9935"`);
        await queryRunner.query(`ALTER TABLE "coupon" DROP CONSTRAINT "FK_621a43003afcc64d9c96091e1d4"`);
        await queryRunner.query(`ALTER TABLE "service" DROP CONSTRAINT "FK_59c89e19cef6920052f4632c64a"`);
        await queryRunner.query(`ALTER TABLE "room" DROP CONSTRAINT "FK_81cc59b5b5aa0ecebe705ed68d2"`);
        await queryRunner.query(`ALTER TABLE "blacklist" ADD CONSTRAINT "FK_53c1ab62c3e5875bc3ac474823e" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rating" ADD CONSTRAINT "FK_3462e3638471c356591d5926309" FOREIGN KEY ("serviceId") REFERENCES "service"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rating" ADD CONSTRAINT "FK_6f0b6108d6f057709003dc86d73" FOREIGN KEY ("roomId") REFERENCES "room"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rating" ADD CONSTRAINT "FK_a6c53dfc89ba3188b389ef29a62" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "booking" ADD CONSTRAINT "FK_336b3f4a235460dc93645fbf222" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payment_history" ADD CONSTRAINT "FK_8799ccb4b093b6880d8cef9ec6e" FOREIGN KEY ("bookingId") REFERENCES "booking"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payment_history" ADD CONSTRAINT "FK_34d643de1a588d2350297da5c24" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "coupon" ADD CONSTRAINT "FK_03de14bf5e5b4410fced2ca9935" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "coupon" ADD CONSTRAINT "FK_621a43003afcc64d9c96091e1d4" FOREIGN KEY ("promoteId") REFERENCES "promote"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "service" ADD CONSTRAINT "FK_59c89e19cef6920052f4632c64a" FOREIGN KEY ("serviceTierId") REFERENCES "service_tier"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "room" ADD CONSTRAINT "FK_81cc59b5b5aa0ecebe705ed68d2" FOREIGN KEY ("roomTierId") REFERENCES "room_tier"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
