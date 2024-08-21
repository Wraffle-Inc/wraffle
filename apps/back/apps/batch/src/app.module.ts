import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { InfrastructureModule } from 'apps/infrastructure/infrastructure.module';
import { envValidationSchema } from 'env.config';


@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: envValidationSchema,
    }),
    InfrastructureModule.forRoot(),
  ],
  providers: [],
})
export class AppModule {}
