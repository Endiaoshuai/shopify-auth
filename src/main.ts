import "dotenv/config";
import "source-map-support/register";

import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app.module";

(async (): Promise<void> => {
  const app = await NestFactory.create(AppModule, {
    ...(process.env.NODE_ENV === "production" ? { logger: false } : {})
  });

  await app.listen(process.env.PORT || 5000);
})();
