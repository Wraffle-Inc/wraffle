import { seeder } from "nestjs-seeder";
import { AgreementVersionSeed } from "./agreement-version.seed";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AgreementVersion } from "apps/domain/agreement/agreement-version/agreement-version.entity";
import { InfrastructureModule } from "apps/infrastructure/infrastructure.module";
import { ConfigModule } from "@nestjs/config";

seeder({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true,
    }),
    TypeOrmModule.forFeature([AgreementVersion]),
    InfrastructureModule.forRoot(),
  ],
}).run([AgreementVersionSeed]);
