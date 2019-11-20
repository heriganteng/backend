import {MigrationInterface, QueryRunner} from "typeorm";

export class GenerateRelationship1574189547233 implements MigrationInterface {
    name = 'GenerateRelationship1574189547233'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "job_requirements__requirement" ("jobId" integer NOT NULL, "requirementId" integer NOT NULL, CONSTRAINT "PK_ffd384f3034c9f1949a5a46a52a" PRIMARY KEY ("jobId", "requirementId"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_915a42f4eed9a81338d02a16cd" ON "job_requirements__requirement" ("jobId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_bfbbc1baccded6558f6eb67c26" ON "job_requirements__requirement" ("requirementId") `, undefined);
        await queryRunner.query(`ALTER TABLE "job_requirements__requirement" ADD CONSTRAINT "FK_915a42f4eed9a81338d02a16cd2" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "job_requirements__requirement" ADD CONSTRAINT "FK_bfbbc1baccded6558f6eb67c260" FOREIGN KEY ("requirementId") REFERENCES "Requirement"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "job_requirements__requirement" DROP CONSTRAINT "FK_bfbbc1baccded6558f6eb67c260"`, undefined);
        await queryRunner.query(`ALTER TABLE "job_requirements__requirement" DROP CONSTRAINT "FK_915a42f4eed9a81338d02a16cd2"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_bfbbc1baccded6558f6eb67c26"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_915a42f4eed9a81338d02a16cd"`, undefined);
        await queryRunner.query(`DROP TABLE "job_requirements__requirement"`, undefined);
    }

}
