import {MigrationInterface, QueryRunner} from "typeorm";

export class createFileinfoSchema1638103209068 implements MigrationInterface {
    name = 'createFileinfoSchema1638103209068'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "filedata" ("id" SERIAL NOT NULL, "filename" character varying NOT NULL, "filesize" bigint NOT NULL, "filetype" character varying NOT NULL, "lastmodified" bigint NOT NULL, "uuid" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_d4c4a02fb7426117dd0db9c2d58" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "filedata"`);
    }

}
