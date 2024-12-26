import { MigrationInterface, QueryRunner } from "typeorm";

export class BookingRelationship1735222082515 implements MigrationInterface {
    name = 'BookingRelationship1735222082515'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "booking_rooms_room" ("bookingId" integer NOT NULL, "roomId" integer NOT NULL, CONSTRAINT "PK_a0b509c26a53b6c21c5d3339a97" PRIMARY KEY ("bookingId", "roomId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_8f1a8045893e516c9e6a74c1cb" ON "booking_rooms_room" ("bookingId") `);
        await queryRunner.query(`CREATE INDEX "IDX_f002f6e24167ea10d48ad286b6" ON "booking_rooms_room" ("roomId") `);
        await queryRunner.query(`CREATE TABLE "booking_services_service" ("bookingId" integer NOT NULL, "serviceId" integer NOT NULL, CONSTRAINT "PK_bc6ae0d231db1da24f187bb1ca9" PRIMARY KEY ("bookingId", "serviceId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_75422d2b5834b10b3f894fa721" ON "booking_services_service" ("bookingId") `);
        await queryRunner.query(`CREATE INDEX "IDX_2bb0659a3e88514096e546dbdc" ON "booking_services_service" ("serviceId") `);
        await queryRunner.query(`ALTER TABLE "booking_rooms_room" ADD CONSTRAINT "FK_8f1a8045893e516c9e6a74c1cb6" FOREIGN KEY ("bookingId") REFERENCES "booking"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "booking_rooms_room" ADD CONSTRAINT "FK_f002f6e24167ea10d48ad286b6b" FOREIGN KEY ("roomId") REFERENCES "room"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "booking_services_service" ADD CONSTRAINT "FK_75422d2b5834b10b3f894fa7213" FOREIGN KEY ("bookingId") REFERENCES "booking"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "booking_services_service" ADD CONSTRAINT "FK_2bb0659a3e88514096e546dbdc0" FOREIGN KEY ("serviceId") REFERENCES "service"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "booking_services_service" DROP CONSTRAINT "FK_2bb0659a3e88514096e546dbdc0"`);
        await queryRunner.query(`ALTER TABLE "booking_services_service" DROP CONSTRAINT "FK_75422d2b5834b10b3f894fa7213"`);
        await queryRunner.query(`ALTER TABLE "booking_rooms_room" DROP CONSTRAINT "FK_f002f6e24167ea10d48ad286b6b"`);
        await queryRunner.query(`ALTER TABLE "booking_rooms_room" DROP CONSTRAINT "FK_8f1a8045893e516c9e6a74c1cb6"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2bb0659a3e88514096e546dbdc"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_75422d2b5834b10b3f894fa721"`);
        await queryRunner.query(`DROP TABLE "booking_services_service"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f002f6e24167ea10d48ad286b6"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8f1a8045893e516c9e6a74c1cb"`);
        await queryRunner.query(`DROP TABLE "booking_rooms_room"`);
    }

}
