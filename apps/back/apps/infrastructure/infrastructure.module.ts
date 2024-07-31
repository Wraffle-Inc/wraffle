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
import { User } from "apps/domain/user/user.entity";
import { AgreementHistory } from "apps/domain/agreement/agreement-history/agreement-history.entity";
import { AgreementVersion } from "apps/domain/agreement/agreement-version/agreement-version.entity";
import { Apply } from "apps/domain/apply/apply.entity";
import { ApplyDetail } from "apps/domain/apply/apply-detail.entity";
import { ApplyPayment } from "apps/domain/apply/apply-payment.entity";
import { SignInHistory } from "apps/domain/auth/signin-history.entity";
import { Notice } from "apps/domain/backoffice/notice/notice.entity";
import { PopUp } from "apps/domain/backoffice/pop-up/pop-up.entity";
import { RecentRaffle } from "apps/domain/backoffice/recent-raffle/recent-raffle.entity";
import { RecommendRaffle } from "apps/domain/backoffice/recommend-raffle/recommend-raffle.entity";
import { RecommendSearch } from "apps/domain/backoffice/recommend-search/recommend-search.entity";
import { Card } from "apps/domain/card/card.entity";
import { Category } from "apps/domain/category/category.entity";
import { Clipping } from "apps/domain/clipping/clipping.entity";
import { Hashtag } from "apps/domain/hashtag/hashtag.entity";
import { ProductHashtag } from "apps/domain/product/product-hashtag.entity";
import { Images } from "apps/domain/image/image.entity";
import { PhoneVerifyHistory } from "apps/domain/phone-verify-history/phone-verify-history.entity";
import { Product } from "apps/domain/product/product.entity";
import { PushNotice } from "apps/domain/push-notice/push-notice.entity";
import { Event } from "apps/domain/event/event.entity";
import { EventHashtag } from "apps/domain/event/event-hashtag.entity";
import { EventProduct } from "apps/domain/event/event-product.entity";
import { Raffle } from "apps/domain/raffle/raffle.entity";
import { RaffleHashtag } from "apps/domain/raffle/raffle-hashtag.entity";

const entities = [
  AgreementHistory,
  AgreementVersion,
  Apply,
  ApplyDetail,
  ApplyPayment,
  Event,
  EventHashtag,
  EventProduct,
  SignInHistory,
  Notice,
  PopUp,
  RecentRaffle,
  RecommendRaffle,
  RecommendSearch,
  Card,
  Category,
  Clipping,
  Hashtag,
  Images,
  PhoneVerifyHistory,
  Product,
  ProductHashtag,
  PushNotice,
  Raffle,
  RaffleHashtag,
  User,
];

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
    TypeOrmModule.forFeature(entities),
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
