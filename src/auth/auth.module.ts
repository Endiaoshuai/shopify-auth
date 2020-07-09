import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

import { ShopModule } from "../shop/shop.module";
import { AuthResolver } from "./auth.resolver";
import { AuthService } from "./auth.service";

const { JWT_SECRET, JWT_EXPIRES_IN } = process.env;

@Module({
  imports: [
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: JWT_EXPIRES_IN || "1d" }
    }),

    ShopModule
  ],
  providers: [AuthService, AuthResolver]
})
export class AuthModule {}
