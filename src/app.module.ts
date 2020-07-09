import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { ShopModule } from "./shop/shop.module";

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRoot(),
    GraphQLModule.forRoot({
      tracing: true,
      autoSchemaFile: true,
      introspection: true,
      playground: true,
      context: ({ req }) => ({ req })
    }),
    ShopModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
