import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ApplicationLogger } from "apps/infrastructure/logger/application.logger";
import { ValidationPipe } from "apps/infrastructure/pipe/validation.pipe";
import { json, urlencoded } from "body-parser";
import * as moment from "moment-timezone";
import { Response } from "express";

import { AppModule } from "./app.module";

async function bootstrap() {
  moment.tz.setDefault("Asia/Seoul");

  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  app.use(json({ limit: "100mb" }));
  app.use(urlencoded({ limit: "100mb", extended: true }));
  app.useLogger(new ApplicationLogger());
  app.useGlobalPipes(new ValidationPipe());
  app.set("trust proxy", true);

  // health check
  app.getHttpAdapter().get("/", (_, res: Response) => {
    res.status(200).send("OK");
  });

  if (process.env.APP_ENV !== "production") {
    const swaggerConfig = new DocumentBuilder()
      .addBearerAuth({ in: "header", type: "http" })
      .setTitle("front api")
      .setVersion("1.0.0")
      .build();
    const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup("api", app, swaggerDocument);
  }

  await app.listen(process.env.PORT || 8000);
}
bootstrap();
