import { DynamicModule, Global, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { join } from "path";

import { NhnCloudService } from "./clients/nhn-cloud/nhn-cloud.service";
import { ApplicationLogger } from "./logger/application.logger";
import {
  addTransactionalDataSource,
  initializeTransactionalContext,
} from "typeorm-transactional";
import { DataSource } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

const clients = [NhnCloudService];

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        const config =
          process.env.NODE_ENV === "test"
            ? {
                host: process.env.TEST_DB_HOST,
                port: Number(process.env.TEST_DB_PORT),
                username: process.env.TEST_DB_USERNAME,
                password: process.env.TEST_DB_PASSWORD,
                database: process.env.TEST_DB_DATABASE,
                extra: {
                  connectionLimit: 1,
                },
              }
            : {
                host: process.env.DB_HOST,
                port: Number(process.env.DB_PORT),
                username: process.env.DB_USERNAME,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_DATABASE,
              };

        return {
          type: "postgres",
          ...config,
          extra: {
            ...config.extra,
            decimalNumbers: true,
            bigNumberStrings: false,
          },
          namingStrategy: new SnakeNamingStrategy(),
          autoLoadEntities: true,
          entities: [join(__dirname, "..", "domain", "**", "*.entity.{ts,js}")],
          synchronize:
            process.env.SYNC === "true" && process.env.NODE_ENV !== "test",
          dropSchema: false,
          timezone: "Z",
        };
      },
      async dataSourceFactory(options) {
        if (!options) {
          throw new Error("Invalid options passed");
        }

        return addTransactionalDataSource(new DataSource(options));
      },
    }),
  ],
  providers: [...clients, ApplicationLogger],
  exports: [TypeOrmModule, ...clients, ApplicationLogger],
})
export class InfrastructureModule {
  public static forRoot(): DynamicModule {
    initializeTransactionalContext();

    return {
      module: InfrastructureModule,
    };
  }
}
