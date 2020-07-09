import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

import { Shop } from "../shop/shop.entity";
import { ShopService } from "../shop/shop.service";
import { JWTPayload } from "./object/jwt-payload.object";

const { JWT_SECRET } = process.env;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(readonly shopService: ShopService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT_SECRET
    });
  }

  public async validate(payload: JWTPayload): Promise<Shop> {
    return this.shopService.findOne({ where: { id: payload.sub } });
  }
}
